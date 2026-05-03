import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Camera } from "lucide-react";
import PageLayout from "../components/layout/PageLayout";
import { useAuth } from "../context/AuthContext";
import { useMemories } from "../hooks/useMemories";

export default function MemoriesPage() {
  const { user } = useAuth();
  const { fetchMemories, deleteMemory, loading } = useMemories();
  const [memories, setMemories] = useState([]);
  const [deleting, setDeleting] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (user) fetchMemories().then(setMemories);
  }, [user]);

  const handleDelete = async (id, storagePath) => {
    if (!confirm("Delete this memory? 🥺")) return;
    setDeleting(id);
    try {
      await deleteMemory(id, storagePath);
      setMemories((prev) => prev.filter((m) => m.id !== id));
      if (lightbox?.id === id) setLightbox(null);
    } finally {
      setDeleting(null);
    }
  };

  const fmt = (mem) =>
    mem.createdAt?.toDate
      ? mem.createdAt.toDate().toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })
      : "Just now";

  // ── Not logged in ─────────────────────────────────────────────────────────
  if (!user) {
    return (
      <PageLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
          <span className="text-6xl mb-4">🔐</span>
          <h2 className="text-3xl font-extrabold text-pink-700 mb-3">Sign In to See Your Memories</h2>
          <p className="text-pink-400 mb-8">Your K-photo strips are saved here after every session 💕</p>
          <Link to="/auth">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
              Sign In / Sign Up 🎀
            </button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>

      {/* ── Lightbox ─────────────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:16, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(8px)" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background:"white", borderRadius:28, padding:24, maxWidth:340, width:"100%", display:"flex", flexDirection:"column", gap:16, boxShadow:"0 32px 80px rgba(236,72,153,0.2)", animation:"lbIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
          >
            <style>{`@keyframes lbIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}`}</style>

            {/* Close */}
            <button onClick={() => setLightbox(null)} style={{ alignSelf:"flex-end", background:"#fce7f3", border:"none", borderRadius:"50%", width:28, height:28, cursor:"pointer", fontSize:16, color:"#be185d", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>

            {/* Image */}
            <img src={lightbox.imageURL} alt={lightbox.title} style={{ width:"100%", borderRadius:16, objectFit:"contain", maxHeight:"60vh", background:"#fff7f8" }} />

            {/* Title + date */}
            <div>
              <p style={{ fontWeight:800, fontSize:15, color:"#be185d", margin:"0 0 2px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                {lightbox.title || "My Memory"}
              </p>
              <p style={{ fontSize:12, color:"#f9a8d4", margin:0 }}>{fmt(lightbox)}</p>
            </div>

            {/* Actions */}
            <div style={{ display:"flex", gap:8 }}>
              <a href={lightbox.imageURL} download={`k-click-${lightbox.id}.png`}
                style={{ flex:1, textAlign:"center", background:"linear-gradient(135deg,#f472b6,#ec4899)", color:"white", fontWeight:700, fontSize:12, padding:"9px 0", borderRadius:99, textDecoration:"none" }}>
                ⬇️ Download
              </a>
              <button onClick={() => handleDelete(lightbox.id, lightbox.storagePath)} disabled={deleting === lightbox.id}
                style={{ display:"flex", alignItems:"center", gap:4, background:"#fef2f2", color:"#ef4444", border:"none", fontWeight:700, fontSize:12, padding:"9px 14px", borderRadius:99, cursor:"pointer", opacity: deleting===lightbox.id ? 0.5:1 }}>
                <Trash2 size={12}/>{deleting===lightbox.id?"…":"Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page ─────────────────────────────────────────────────────────────── */}
      <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#fff0f6 0%,#fdf2f8 40%,#f5f0ff 100%)" }}>
        <section style={{ maxWidth:1100, margin:"0 auto", padding:"48px 24px" }}>

          {/* Header */}
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <h2 style={{ fontSize:36, fontWeight:900, color:"#be185d", margin:"0 0 6px", letterSpacing:"-0.5px" }}>🌸 Your K-Memories</h2>
            <p style={{ fontSize:13, color:"#f9a8d4", margin:0 }}>
              Hi <strong style={{ color:"#ec4899" }}>{user.displayName || user.email}</strong> — all your saved strips in one place 💖
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 0", gap:12 }}>
              <span style={{ fontSize:36, animation:"spin 1.2s linear infinite", display:"block" }}>🌸</span>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              <p style={{ fontSize:13, color:"#f9a8d4", fontWeight:600 }}>Loading your memories…</p>
            </div>
          )}

          {/* Empty */}
          {!loading && memories.length === 0 && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 16px", textAlign:"center", gap:12 }}>
              <Camera size={52} color="#fce7f3"/>
              <p style={{ fontSize:20, fontWeight:800, color:"#ec4899", margin:0 }}>No memories yet!</p>
              <p style={{ fontSize:13, color:"#f9a8d4", maxWidth:280, margin:0 }}>
                Head to the booth, take some cute photos and save them — they'll appear here 🎀
              </p>
              <Link to="/booth">
                <button style={{ marginTop:8, background:"linear-gradient(135deg,#f472b6,#ec4899)", color:"white", fontWeight:700, fontSize:14, padding:"11px 28px", borderRadius:99, border:"none", cursor:"pointer", boxShadow:"0 4px 16px rgba(236,72,153,0.3)" }}>
                  Go to Booth 📸
                </button>
              </Link>
            </div>
          )}

          {/* Count */}
          {!loading && memories.length > 0 && (
            <p style={{ textAlign:"center", fontSize:11, color:"#f9a8d4", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:28 }}>
              {memories.length} strip{memories.length !== 1 ? "s" : ""} saved
            </p>
          )}

          {/* Grid */}
          {!loading && memories.length > 0 && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:28 }}>
              {memories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  fmt={fmt}
                  deleting={deleting}
                  onOpen={() => setLightbox(memory)}
                  onDelete={() => handleDelete(memory.id, memory.storagePath)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
}

// ── Memory Card ───────────────────────────────────────────────────────────────
function MemoryCard({ memory, fmt, deleting, onOpen, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const isDeleting = deleting === memory.id;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 16px 40px rgba(236,72,153,0.18)"
          : "0 2px 12px rgba(236,72,153,0.08)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s ease",
        cursor: "pointer",
        border: "1px solid #fce7f3",
        position: "relative",
      }}
    >
      {/* Image */}
      <div
        onClick={onOpen}
        style={{ background:"linear-gradient(135deg,#fff0f6,#fdf2f8)", display:"flex", alignItems:"center", justifyContent:"center", padding:"16px 16px 12px", minHeight:220 }}
      >
        <img
          src={memory.imageURL}
          alt={memory.title || "Memory"}
          style={{ maxHeight:220, width:"auto", objectFit:"contain", borderRadius:12, display:"block" }}
        />
      </div>

      {/* Info */}
      <div
        onClick={onOpen}
        style={{ padding:"12px 16px 14px", borderTop:"1px solid #fce7f3" }}
      >
        <p style={{ fontWeight:800, fontSize:13, color:"#be185d", margin:"0 0 3px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
          {memory.title || "My Memory"}
        </p>
        <p style={{ fontSize:11, color:"#f9a8d4", margin:0 }}>{fmt(memory)}</p>
      </div>

      {/* Delete button — top right, always visible on hover */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        disabled={isDeleting}
        style={{
          position:"absolute", top:10, right:10,
          background: hovered ? "white" : "transparent",
          border:"none", borderRadius:"50%",
          width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", opacity: hovered ? (isDeleting ? 0.4 : 1) : 0,
          transition:"opacity 0.2s, background 0.2s",
          boxShadow: hovered ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          color:"#ef4444",
        }}
        title="Delete"
      >
        {isDeleting
          ? <span style={{ width:12, height:12, border:"2px solid #fca5a5", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite", display:"block" }}/>
          : <Trash2 size={13}/>}
      </button>
    </div>
  );
}