import { Router } from "express";
import multer from "multer";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../config/firebase.js";
import { supabase, BUCKET } from "../config/supabase.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

const EXT = { "image/png": "png", "image/jpeg": "jpg" };

// every route below requires a valid Firebase login
router.use(verifyToken);

// ── Save a memory ───────────────────────────────────────────────
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file || !EXT[file.mimetype]) {
      return res.status(400).json({ error: "Upload a PNG or JPEG image in the 'image' field" });
    }

    let stickers = [];
    try {
      const parsed = JSON.parse(req.body.stickers || "[]");
      if (Array.isArray(parsed)) stickers = parsed.slice(0, 20);
    } catch {
      /* ignore bad sticker JSON */
    }

    const uid = req.user.uid;
    const storagePath = `${uid}/${Date.now()}.${EXT[file.mimetype]}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, file.buffer, { contentType: file.mimetype, upsert: false });
    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
    const imageURL = urlData?.publicUrl;

    const data = {
      uid,
      imageURL,
      storagePath,
      title: String(req.body.title || "My Memory").slice(0, 100),
      layout: req.body.layout || null,
      frame: req.body.frame || null,
      filter: req.body.filter || null,
      stickers,
      createdAt: FieldValue.serverTimestamp(),
    };

    let docRef;
    try {
      docRef = await adminDb.collection("memories").add(data);
    } catch (dbErr) {
      // don't leave an orphan image behind if the database write fails
      await supabase.storage.from(BUCKET).remove([storagePath]);
      throw dbErr;
    }

    res.status(201).json({ id: docRef.id, ...data, createdAt: new Date().toISOString() });
  } catch (err) {
    console.error("[POST /memories]", err);
    res.status(500).json({ error: err.message });
  }
});

// ── List my memories (newest first) ─────────────────────────────
router.get("/", async (req, res) => {
  try {
    const snap = await adminDb
      .collection("memories")
      .where("uid", "==", req.user.uid)
      .get();

    const memories = snap.docs.map((d) => {
      const data = d.data();
      return { id: d.id, ...data, createdAt: data.createdAt?.toDate?.().toISOString() || null };
    });

    memories.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    res.json(memories);
  } catch (err) {
    console.error("[GET /memories]", err);
    res.status(500).json({ error: err.message });
  }
});

// ── Delete one of my memories ───────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const ref = adminDb.collection("memories").doc(req.params.id);
    const snap = await ref.get();

    if (!snap.exists) return res.status(404).json({ error: "Memory not found" });
    const data = snap.data();
    if (data.uid !== req.user.uid) return res.status(403).json({ error: "Not your memory" });

    // delete the image first; if that fails we keep the record so you can retry
    if (data.storagePath) {
      const { error } = await supabase.storage.from(BUCKET).remove([data.storagePath]);
      if (error) throw new Error(`Storage delete failed: ${error.message}`);
    }
    await ref.delete();

    res.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /memories]", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;