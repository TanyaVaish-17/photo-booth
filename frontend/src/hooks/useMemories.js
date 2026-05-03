import { useState } from "react";
import {
  collection, addDoc, getDocs, deleteDoc,
  doc, query, where, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { supabase } from "../supabase/config";
import { useAuth } from "../context/AuthContext";

// Storage bucket name — create this in your Supabase dashboard
const BUCKET = "memories";

// Convert a data URL → Blob for clean binary upload
function dataUrlToBlob(dataUrl) {
  const [header, base64] = dataUrl.split(",");
  const mime   = header.match(/:(.*?);/)[1];
  const binary = atob(base64);
  const arr    = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

export function useMemories() {
  const { user } = useAuth();
  const [saving,  setSaving]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  // ── Save ──────────────────────────────────────────────────────────────────
  // Uploads the composited strip PNG to Supabase Storage,
  // then writes metadata (imageURL, layout, filter…) to Firestore.
  const saveMemory = async ({ imageDataUrl, layout, frame, filter, stickers }) => {
    if (!user) throw new Error("Must be logged in to save memories");
    setSaving(true);
    setError(null);

    try {
      // 1. Upload image blob to Supabase Storage
      const blob     = dataUrlToBlob(imageDataUrl);
      const filePath = `${user.uid}/${Date.now()}.png`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, blob, { contentType: "image/png", upsert: false });

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

      // 2. Get the public URL of the uploaded image
      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath);

      const imageURL = urlData?.publicUrl;
      if (!imageURL) throw new Error("Could not get public URL from Supabase");

      // 3. Write metadata to Firestore
      await addDoc(collection(db, "memories"), {
        uid:         user.uid,
        imageURL,
        storagePath: filePath,   // kept so we can delete from Supabase later
        layout:      layout  || null,
        frame:       frame   || null,
        filter:      filter  || null,
        stickers:    stickers || [],
        createdAt:   serverTimestamp(),
      });

      return imageURL;
    } catch (err) {
      console.error("[useMemories] saveMemory failed:", err);
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchMemories = async () => {
    if (!user) return [];
    setLoading(true);
    setError(null);
    try {
      const q    = query(
        collection(db, "memories"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  // Removes the Firestore doc first, then deletes from Supabase Storage.
  const deleteMemory = async (memoryId, storagePath) => {
    setError(null);
    try {
      await deleteDoc(doc(db, "memories", memoryId));
      if (storagePath) {
        const { error: delError } = await supabase.storage
          .from(BUCKET)
          .remove([storagePath]);
        if (delError) console.warn("[useMemories] Storage delete failed:", delError.message);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { saveMemory, fetchMemories, deleteMemory, saving, loading, error };
}