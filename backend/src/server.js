import "dotenv/config";
import express from "express";
import cors from "cors";
import { verifyToken } from "./middleware/verifyToken.js";
import memoriesRouter from "./routes/memories.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// TEMPORARY: lets us test login tokens later
app.get("/api/me", verifyToken, (req, res) => {
  res.json({ uid: req.user.uid, email: req.user.email });
});

app.use("/api/memories", memoriesRouter);

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "Image too large (max 10 MB)" });
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});