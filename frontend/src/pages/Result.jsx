import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Share2, RefreshCw, CheckCircle2, XCircle, Loader2, X } from "lucide-react";
import PageLayout from "../components/layout/PageLayout";
import PhotoFrame from "../components/shared/PhotoFrame";
import DownloadButton from "../components/shared/DownloadButton";
import { useAuth } from "../context/AuthContext";
import { useMemories } from "../hooks/useMemories";
import { renderStripToDataUrl } from "../utils/renderStripToDataUrl";

function Toast({ toast, onDismiss }) {
  const timerRef = useRef(null);
  useEffect(() => {
    if (!toast) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timerRef.current);
  }, [toast, onDismiss]);
  if (!toast) return null;
  const isSuccess = toast.type === "success";
  return (
    <div style={{ position:"fixed", bottom:32, left:"50%", transform:"translateX(-50%)", zIndex:9999, animation:"toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}>
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(24px) scale(0.92)}to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}`}</style>
      <div style={{ display:"flex", alignItems:"center", gap:10, background:isSuccess?"#fff1f2":"#fef2f2", border:`1.5px solid ${isSuccess?"#fda4af":"#fca5a5"}`, borderRadius:99, padding:"10px 20px", boxShadow:"0 8px 32px rgba(236,72,153,0.18)", minWidth:220 }}>
        {isSuccess ? <CheckCircle2 size={18} color="#e11d48"/> : <XCircle size={18} color="#dc2626"/>}
        <span style={{ fontSize:13, fontWeight:700, color:isSuccess?"#be185d":"#b91c1c" }}>{toast.message}</span>
        {isSuccess && (
          <Link to="/memories" style={{ marginLeft:6 }}>
            <span style={{ fontSize:11, fontWeight:700, color:"white", background:"#ec4899", borderRadius:99, padding:"3px 10px", whiteSpace:"nowrap" }}>View 🌸</span>
          </Link>
        )}
      </div>
    </div>
  );
}

function NameModal({ onConfirm, onCancel, saving }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 80); }, []);
  return (
    <div onClick={onCancel} style={{ position:"fixed", inset:0, zIndex:9998, display:"flex", alignItems:"center", justifyContent:"center", padding:16, background:"rgba(0,0,0,0.45)", backdropFilter:"blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"white", borderRadius:24, padding:"28px 24px", width:"100%", maxWidth:360, boxShadow:"0 24px 60px rgba(236,72,153,0.18)", animation:"modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}>
        <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}} @keyframes rspin{to{transform:rotate(360deg)}}`}</style>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
          <div>
            <p style={{ fontSize:18, fontWeight:800, color:"#be185d", margin:0 }}>Name this memory 💖</p>
            <p style={{ fontSize:12, color:"#f9a8d4", margin:"2px 0 0" }}>Give your strip a cute title</p>
          </div>
          <button onClick={onCancel} style={{ background:"none", border:"none", cursor:"pointer", color:"#d1d5db", padding:2 }}><X size={18}/></button>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !saving && onConfirm(title.trim())}
          placeholder="Give your memory a name 💖"
          maxLength={40}
          style={{ width:"100%", border:"1.5px solid #fce7f3", borderRadius:12, padding:"10px 14px", fontSize:14, color:"#be185d", outline:"none", background:"#fff7f8", boxSizing:"border-box", marginBottom:16 }}
        />
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={onCancel} disabled={saving} style={{ flex:1, border:"1.5px solid #fce7f3", background:"white", color:"#f9a8d4", fontWeight:700, fontSize:13, padding:"9px 0", borderRadius:99, cursor:"pointer" }}>Cancel</button>
          <button onClick={() => onConfirm(title.trim())} disabled={saving} style={{ flex:2, background:"linear-gradient(135deg,#f472b6,#ec4899)", color:"white", fontWeight:700, fontSize:13, padding:"9px 0", borderRadius:99, border:"none", cursor:saving?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, opacity:saving?0.7:1 }}>
            {saving ? <><Loader2 size={13} style={{ animation:"rspin 1s linear infinite" }}/> Saving…</> : "💾 Save Memory"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Result() {
  const { state }      = useLocation();
  const navigate       = useNavigate();
  const { user }       = useAuth();
  const { saveMemory } = useMemories();

  const images            = state?.images            || [];
  const layout            = state?.layout            || "vertical";
  const frame             = state?.frame             || null;
  const filter            = state?.filter            || null;
  const stickerPlacements = state?.stickerPlacements || [];

  const [saved,     setSaved]     = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [shared,    setShared]    = useState(false);
  const [toast,     setToast]     = useState(null);
  const [showModal, setShowModal] = useState(false);

  const showToast    = (type, message) => setToast({ type, message });
  const dismissToast = () => setToast(null);

  const handleSaveClick = () => { if (!saving && !saved) setShowModal(true); };

  const handleSaveConfirm = async (title) => {
    setSaving(true);
    try {
      const renderPromise  = renderStripToDataUrl({ capturedImages:images, layout, frame, filter, stickerPlacements, scale:1 });
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Render timed out — please try again.")), 25000));
      const compositeDataUrl = await Promise.race([renderPromise, timeoutPromise]);
      await saveMemory({ imageDataUrl:compositeDataUrl, layout, frame, filter, stickers:stickerPlacements, title: title || "My Memory" });
      setShowModal(false);
      setSaved(true);
      showToast("success", "Saved to your Memories Wall! 🌸");
    } catch (err) {
      const msg = err?.message || "Save failed. Please try again.";
      showToast("error", msg.length > 80 ? "Save failed. Check your connection and try again." : msg);
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title:"My K-Click Booth Strip 📸", text:"Check out my cute K-style photo strip! 💕", url:window.location.href }); setShared(true); } catch (_) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      showToast("success", "Link copied to clipboard!");
    }
  };

  if (images.length === 0) {
    return (
      <PageLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
          <span className="text-6xl mb-4">📷</span>
          <h3 className="text-2xl font-bold text-pink-600 mb-2">No photos yet!</h3>
          <p className="text-pink-400 mb-8 text-sm">Head to the Booth first.</p>
          <Link to="/booth"><button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all">Go to Booth 📸</button></Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Toast toast={toast} onDismiss={dismissToast} />
      {showModal && <NameModal onConfirm={handleSaveConfirm} onCancel={() => { if (!saving) setShowModal(false); }} saving={saving} />}

      <main className="py-10 px-4" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-pink-700 drop-shadow-lg">🎉 Your K-Photo Strip!</h2>
          <p className="text-pink-400 mt-1 text-sm">Download, share or save to your Memories Wall 💕</p>
        </div>

        {/* ── MAIN ROW: strip + actions side by side ── */}
        <div style={{ display:"flex", flexDirection:"row", flexWrap:"wrap", gap:24, alignItems:"flex-start", justifyContent:"center", width:"100%" }}>

          {/* Strip card — shrinks to fit its content */}
          <div style={{ background:"rgba(255,255,255,0.9)", borderRadius:24, boxShadow:"0 20px 60px rgba(0,0,0,0.1)", padding:20, display:"flex", flexDirection:"column", alignItems:"center", gap:8, flexShrink:0 }}>
            <p style={{ color:"#f9a8d4", fontWeight:600, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", margin:0 }}>Your Strip</p>
            <PhotoFrame layout={layout} frame={frame} filter={filter} stickerPlacements={stickerPlacements} images={images} />
          </div>

          {/* Actions panel — grows to fill remaining space */}
          <div style={{ display:"flex", flexDirection:"column", gap:12, flex:1, minWidth:260 }}>
            <p style={{ fontSize:14, fontWeight:800, color:"#be185d", margin:0 }}>What would you like to do?</p>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#fdf2f8", borderRadius:16, padding:"12px 16px", border:"1px solid #fce7f3" }}>
              <div>
                <p style={{ fontWeight:600, color:"#be185d", fontSize:14, margin:0 }}>⬇️ Download</p>
                <p style={{ fontSize:12, color:"#f9a8d4", margin:0 }}>Save as PNG to your device</p>
              </div>
              <DownloadButton capturedImages={images} layout={layout} frame={frame} filter={filter} stickerPlacements={stickerPlacements} />
            </div>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#faf5ff", borderRadius:16, padding:"12px 16px", border:"1px solid #ede9fe" }}>
              <div>
                <p style={{ fontWeight:600, color:"#7c3aed", fontSize:14, margin:0 }}>🔗 Share</p>
                <p style={{ fontSize:12, color:"#c4b5fd", margin:0 }}>{shared ? "Link copied! ✅" : "Share or copy link"}</p>
              </div>
              <button onClick={handleShare} style={{ display:"flex", alignItems:"center", gap:6, background:"#7c3aed", color:"white", fontSize:12, fontWeight:700, padding:"6px 16px", borderRadius:99, border:"none", cursor:"pointer", whiteSpace:"nowrap" }}>
                <Share2 size={12}/> Share
              </button>
            </div>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background: saved ? "#f0fdf4" : "#fff1f2", borderRadius:16, padding:"12px 16px", border: saved ? "1px solid #bbf7d0" : "1px solid #fecdd3", transition:"all 0.3s" }}>
              <div>
                <p style={{ fontWeight:600, fontSize:14, margin:0, color: saved ? "#15803d" : "#be123c" }}>🌸 Save to Memories</p>
                <p style={{ fontSize:12, margin:0, color: saved ? "#86efac" : "#fda4af" }}>
                  {!user ? "Sign in to save your strip" : saved ? "Saved to your Memories Wall ✅" : "Add to your Memories Wall"}
                </p>
              </div>
              <div style={{ flexShrink:0 }}>
                {!user ? (
                  <Link to="/auth"><button style={{ background:"#fb7185", color:"white", fontSize:12, fontWeight:700, padding:"6px 16px", borderRadius:99, border:"none", cursor:"pointer", whiteSpace:"nowrap" }}>Sign In</button></Link>
                ) : saved ? (
                  <Link to="/memories"><button style={{ background:"#22c55e", color:"white", fontSize:12, fontWeight:700, padding:"6px 16px", borderRadius:99, border:"none", cursor:"pointer", whiteSpace:"nowrap" }}>View 🌸</button></Link>
                ) : (
                  <button onClick={handleSaveClick} disabled={saving} style={{ display:"flex", alignItems:"center", gap:6, background:"#f43f5e", color:"white", fontSize:12, fontWeight:700, padding:"6px 16px", borderRadius:99, border:"none", cursor:saving?"not-allowed":"pointer", whiteSpace:"nowrap", opacity:saving?0.6:1 }}>
                    {saving ? <><Loader2 size={12} className="animate-spin"/> Saving…</> : <>💾 Save</>}
                  </button>
                )}
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#f9fafb", borderRadius:16, padding:"12px 16px", border:"1px solid #e5e7eb" }}>
              <div>
                <p style={{ fontWeight:600, color:"#4b5563", fontSize:14, margin:0 }}>🔄 Start Over</p>
                <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>Fresh session at the booth</p>
              </div>
              <button onClick={() => navigate("/booth")} style={{ display:"flex", alignItems:"center", gap:6, background:"#6b7280", color:"white", fontSize:12, fontWeight:700, padding:"6px 16px", borderRadius:99, border:"none", cursor:"pointer", whiteSpace:"nowrap" }}>
                <RefreshCw size={12}/> Restart
              </button>
            </div>
          </div>

        </div>
      </main>
    </PageLayout>
  );
}