import { useState } from "react";
import {
  collection, addDoc, getDocs, deleteDoc,
  doc, query, where, orderBy, serverTimestamp,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

export function useMemories() {
  const { user } = useAuth();
  const [saving,  setSaving]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  // Save a photo strip → Storage (image) + Firestore (metadata)
  const saveMemory = async ({ imageDataUrl, layout, frame, filter, stickers }) => {
    if (!user) throw new Error("Must be logged in to save memories");
    setSaving(true);
    setError(null);
    try {
      // 1. Upload image to Firebase Storage
      const filename  = `memories/${user.uid}/${Date.now()}.png`;
      const storageRef = ref(storage, filename);
      await uploadString(storageRef, imageDataUrl, "data_url");
      const downloadURL = await getDownloadURL(storageRef);

      // 2. Save metadata to Firestore
      await addDoc(collection(db, "memories"), {
        uid:       user.uid,
        imageURL:  downloadURL,
        storagePath: filename,
        layout:    layout   || null,
        frame:     frame    || null,
        filter:    filter   || null,
        stickers:  stickers || [],
        createdAt: serverTimestamp(),
      });

      return downloadURL;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  // Fetch all memories for the current user
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

  // Delete a memory (Storage + Firestore)
  const deleteMemory = async (memoryId, storagePath) => {
    setError(null);
    try {
      await deleteDoc(doc(db, "memories", memoryId));
      if (storagePath) {
        await deleteObject(ref(storage, storagePath));
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { saveMemory, fetchMemories, deleteMemory, saving, loading, error };
}