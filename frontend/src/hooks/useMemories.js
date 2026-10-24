import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Convert a data URL → Blob for clean binary upload
function dataUrlToBlob(dataUrl) {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(base64);
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

// Sends a request to our backend with the user's Firebase login token
async function apiRequest(user, path, options = {}) {
  const token = await user.getIdToken();
  const res = await fetch(`${API_URL}/api/memories${path}`, {
    ...options,
    headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
  return body;
}

export function useMemories() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Save ──────────────────────────────────────────────────────────────
  const saveMemory = async ({ imageDataUrl, layout, frame, filter, stickers, title }) => {
    if (!user) throw new Error("Must be logged in to save memories");
    setSaving(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("image", dataUrlToBlob(imageDataUrl), "strip.png");
      form.append("title", title || "My Memory");
      if (layout) form.append("layout", layout);
      if (frame) form.append("frame", frame);
      if (filter) form.append("filter", filter);
      form.append("stickers", JSON.stringify(stickers || []));

      const memory = await apiRequest(user, "", { method: "POST", body: form });
      return memory.imageURL;
    } catch (err) {
      console.error("[useMemories] saveMemory failed:", err);
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  // ── List ──────────────────────────────────────────────────────────────
  const fetchMemories = async () => {
    if (!user) return [];
    setLoading(true);
    setError(null);
    try {
      return await apiRequest(user, "");
    } catch (err) {
      console.error("[fetchMemories] error:", err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────
  const deleteMemory = async (memoryId) => {
    setError(null);
    try {
      await apiRequest(user, `/${memoryId}`, { method: "DELETE" });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { saveMemory, fetchMemories, deleteMemory, saving, loading, error };
}