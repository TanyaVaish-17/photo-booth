import React from "react";
import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  { href: "mailto:contact@kclickbooth.com", icon: <Mail size={15} />,      label: "Email",     glow: "rgba(244,114,182,0.6)" },
  { href: "tel:+1234567890",                icon: <Phone size={15} />,     label: "Phone",     glow: "rgba(251,113,133,0.6)" },
  { href: "#",                              icon: <Facebook size={15} />,  label: "Facebook",  glow: "rgba(236,72,153,0.6)"  },
  { href: "#",                              icon: <Instagram size={15} />, label: "Instagram", glow: "rgba(244,63,94,0.6)"   },
  { href: "#",                              icon: <Twitter size={15} />,   label: "Twitter",   glow: "rgba(225,29,72,0.6)"   },
];

const quickLinks = [
  { to: "/",         icon: "🏠", label: "Home"     },
  { to: "/booth",    icon: "📸", label: "Booth"    },
  { to: "/memories", icon: "🌸", label: "Memories" },
];

export default function Footer() {
  return (
    <footer style={{
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(160deg, #fff0f6 0%, #fce7f3 25%, #ffe4e6 55%, #fecdd3 80%, #ffd6e7 100%)",
    }}>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(8deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-7px) rotate(-6deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes glowPulse { 0%,100%{opacity:0.5} 50%{opacity:0.9} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
      `}</style>

      {/* ── Blurred background blobs ── */}
      <div style={{ position:"absolute", top:-80, left:-80, width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle, rgba(244,114,182,0.22) 0%, transparent 68%)", filter:"blur(40px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:-40, right:-60, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(251,113,133,0.18) 0%, transparent 68%)", filter:"blur(35px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-60, left:"30%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(253,164,175,0.2) 0%, transparent 68%)", filter:"blur(45px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-40, right:"10%", width:240, height:240, borderRadius:"50%", background:"radial-gradient(circle, rgba(248,113,113,0.12) 0%, transparent 68%)", filter:"blur(30px)", pointerEvents:"none" }} />

      {/* ── Floating emoji decorations ── */}
      <span style={{ position:"absolute", top:18, left:"8%",  fontSize:18, opacity:0.3, animation:"floatA 3.5s ease-in-out infinite",                  pointerEvents:"none", userSelect:"none" }}>💖</span>
      <span style={{ position:"absolute", top:30, left:"22%", fontSize:12, opacity:0.2, animation:"floatB 2.8s ease-in-out infinite",                  pointerEvents:"none", userSelect:"none" }}>✨</span>
      <span style={{ position:"absolute", top:14, left:"50%", fontSize:14, opacity:0.2, animation:"floatC 4s ease-in-out infinite",                    pointerEvents:"none", userSelect:"none" }}>🌸</span>
      <span style={{ position:"absolute", top:24, right:"20%",fontSize:11, opacity:0.2, animation:"floatA 3.2s ease-in-out infinite", animationDelay:"0.6s", pointerEvents:"none", userSelect:"none" }}>💕</span>
      <span style={{ position:"absolute", top:16, right:"6%", fontSize:16, opacity:0.25,animation:"floatB 3.8s ease-in-out infinite", animationDelay:"1s",  pointerEvents:"none", userSelect:"none" }}>🎀</span>
      <span style={{ position:"absolute", bottom:22, left:"14%",fontSize:13,opacity:0.2, animation:"floatC 3s ease-in-out infinite",  animationDelay:"1.2s", pointerEvents:"none", userSelect:"none" }}>✨</span>
      <span style={{ position:"absolute", bottom:18, right:"35%",fontSize:11,opacity:0.18,animation:"floatA 4.2s ease-in-out infinite",animationDelay:"0.4s", pointerEvents:"none", userSelect:"none" }}>💖</span>

      {/* ── Soft top border line ── */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg, transparent, rgba(236,72,153,0.25) 30%, rgba(244,114,182,0.35) 50%, rgba(236,72,153,0.25) 70%, transparent)", pointerEvents:"none" }} />

      {/* ══════════════════════════════════
          MAIN CONTENT — full width, padded
      ══════════════════════════════════ */}
      <div style={{ position:"relative", zIndex:1, maxWidth:1200, margin:"0 auto", padding:"30px 32px 18px" }}>

        {/* ── 3-column grid ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:"24px 48px", marginBottom:22 }}>

          {/* ═══ COL 1 — Brand ═══ */}
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration:"none", display:"inline-flex", alignItems:"center", gap:10 }}>
              <div style={{ width:38, height:38, borderRadius:13, background:"linear-gradient(135deg,#ec4899,#f43f5e)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 14px rgba(236,72,153,0.4), inset 0 1px 0 rgba(255,255,255,0.25)", flexShrink:0 }}>
                <span style={{ fontSize:18 }}>📸</span>
              </div>
              <div>
                <p style={{ margin:0, fontSize:20, fontWeight:900, color:"#9d174d", letterSpacing:"-0.5px", lineHeight:1 }}>K-Click</p>
                <p style={{ margin:0, fontSize:9,  fontWeight:700, color:"#f9a8d4", letterSpacing:"0.15em", textTransform:"uppercase" }}>Photo Booth</p>
              </div>
            </Link>

            {/* Tagline */}
            <p style={{ margin:0, fontSize:12, color:"#9d174d", lineHeight:1.7, opacity:0.8, maxWidth:200 }}>
              Your cute Korean-style photo booth for capturing magical memories ✨
            </p>

            {/* Social icons */}
            <div style={{ display:"flex", gap:8, marginTop:2 }}>
              {socialLinks.map(({ href, icon, label, glow }) => (
                <a key={label} href={href} aria-label={label}
                  style={{ width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.65)", border:"1px solid rgba(244,114,182,0.25)", display:"flex", alignItems:"center", justifyContent:"center", color:"#ec4899", textDecoration:"none", boxShadow:"0 2px 8px rgba(236,72,153,0.12)", transition:"all 0.2s ease", flexShrink:0 }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.transform="translateY(-3px) scale(1.15)"; el.style.background="white"; el.style.boxShadow=`0 6px 18px ${glow}`; el.style.borderColor="rgba(244,114,182,0.5)"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.transform="translateY(0) scale(1)"; el.style.background="rgba(255,255,255,0.65)"; el.style.boxShadow="0 2px 8px rgba(236,72,153,0.12)"; el.style.borderColor="rgba(244,114,182,0.25)"; }}>
                  {icon}
                </a>
              ))}
            </div>
            {/* Tiny cute tagline below icons */}
            <p style={{ margin:0, fontSize:10, color:"#f472b6", fontWeight:600, letterSpacing:"0.06em" }}>📍 Seoul · 💌 K-Style · 🎞️ Memories</p>
          </div>

          {/* ═══ COL 2 — Quick Links ═══ */}
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            <p style={{ margin:"0 0 8px", fontSize:10, fontWeight:900, color:"#f472b6", textTransform:"uppercase", letterSpacing:"0.14em" }}>Navigation</p>
            {quickLinks.map(({ to, icon, label }) => (
              <Link key={label} to={to}
                style={{ display:"inline-flex", alignItems:"center", gap:8, textDecoration:"none", fontSize:13, fontWeight:700, color:"#9d174d", padding:"6px 12px", borderRadius:12, background:"rgba(255,255,255,0.45)", border:"1px solid rgba(244,114,182,0.18)", transition:"all 0.18s ease", width:"fit-content" }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background="rgba(255,255,255,0.85)"; el.style.transform="translateX(5px)"; el.style.boxShadow="0 3px 12px rgba(236,72,153,0.15)"; el.style.borderColor="rgba(244,114,182,0.4)"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background="rgba(255,255,255,0.45)"; el.style.transform="translateX(0)"; el.style.boxShadow="none"; el.style.borderColor="rgba(244,114,182,0.18)"; }}>
                <span style={{ fontSize:14 }}>{icon}</span>
                <span>{label}</span>
                <span style={{ marginLeft:"auto", fontSize:10, color:"#f9a8d4", paddingLeft:8 }}>→</span>
              </Link>
            ))}
          </div>

          {/* ═══ COL 3 — CTA ═══ */}
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <p style={{ margin:"0 0 8px", fontSize:10, fontWeight:900, color:"#f472b6", textTransform:"uppercase", letterSpacing:"0.14em" }}>Start Creating</p>
            <p style={{ margin:0, fontSize:12, color:"#9d174d", lineHeight:1.7, opacity:0.8, maxWidth:200 }}>
              Choose a layout, snap your cutest shots, and save your K-memories forever 💕
            </p>

            {/* Glow blob behind button + sparkle */}
            <div style={{ position:"relative", display:"inline-block", marginTop:2 }}>
              {/* Soft glow behind */}
              <div style={{ position:"absolute", inset:"-8px -12px", borderRadius:99, background:"radial-gradient(ellipse, rgba(236,72,153,0.18) 0%, transparent 70%)", pointerEvents:"none", filter:"blur(6px)" }} />
              {/* Floating sparkle */}
              <span style={{ position:"absolute", top:-8, right:-10, fontSize:11, animation:"floatB 2s ease-in-out infinite", pointerEvents:"none", userSelect:"none", zIndex:2 }}>✨</span>
            {/* Glossy animated CTA button */}
            <Link to="/booth" style={{ textDecoration:"none", display:"inline-block" }}>
              <button
                style={{
                  position:"relative", overflow:"hidden",
                  padding:"10px 22px", borderRadius:99, border:"none", cursor:"pointer",
                  background:"linear-gradient(135deg, #ec4899 0%, #e11d48 50%, #f43f5e 100%)",
                  backgroundSize:"200% auto",
                  color:"white", fontSize:12, fontWeight:800,
                  boxShadow:"0 8px 24px rgba(236,72,153,0.5), 0 2px 6px rgba(244,63,94,0.25), inset 0 1px 0 rgba(255,255,255,0.25)",
                  transition:"transform 0.2s, box-shadow 0.2s",
                  letterSpacing:"0.02em",
                }}
                onMouseEnter={e => { const el=e.currentTarget; el.style.transform="translateY(-3px) scale(1.04)"; el.style.boxShadow="0 14px 32px rgba(236,72,153,0.65), 0 4px 10px rgba(244,63,94,0.3), inset 0 1px 0 rgba(255,255,255,0.3)"; }}
                onMouseLeave={e => { const el=e.currentTarget; el.style.transform="translateY(0) scale(1)"; el.style.boxShadow="0 8px 24px rgba(236,72,153,0.5), 0 2px 6px rgba(244,63,94,0.25), inset 0 1px 0 rgba(255,255,255,0.25)"; }}>
                {/* Glossy sheen */}
                <span style={{ position:"absolute", inset:0, borderRadius:99, background:"linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 55%)", pointerEvents:"none" }} />
                <span style={{ position:"relative", zIndex:1 }}>Open Booth 📸</span>
              </button>
            </Link>

            {/* Trust badges */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:2 }}>
              {["🆓 Free", "⚡ Instant", "💾 Download"].map(badge => (
                <span key={badge} style={{ fontSize:10, fontWeight:700, color:"#be185d", background:"rgba(255,255,255,0.55)", border:"1px solid rgba(244,114,182,0.25)", padding:"3px 9px", borderRadius:99 }}>
                  {badge}
                </span>
              ))}
            </div>
            </div>{/* close glow wrapper */}
          </div>

        </div>

        {/* ── Divider ── */}
        <div style={{ height:1, background:"linear-gradient(90deg, transparent, rgba(236,72,153,0.2) 20%, rgba(244,114,182,0.3) 50%, rgba(236,72,153,0.2) 80%, transparent)", marginBottom:12 }} />

        {/* ── Copyright bar ── */}
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:8 }}>
          <p style={{ margin:0, fontSize:11, color:"#be185d", fontWeight:600 }}>
            © 2025 <span style={{ fontWeight:900 }}>K-Click Booth</span>
          </p>
          <p style={{ margin:0, fontSize:11, color:"#be185d", display:"flex", alignItems:"center", gap:5, fontWeight:500 }}>
            Built with{" "}
            <span style={{ display:"inline-block", animation:"floatA 1.8s ease-in-out infinite", fontSize:13 }}>💖</span>
            {" "}by <span style={{ fontWeight:800 }}>Tanya</span>
          </p>
          <p style={{ margin:0, fontSize:11, color:"#be185d", fontWeight:700, letterSpacing:"0.05em" }}>
            ✨ Korean Photo Booth App
          </p>
        </div>

      </div>
    </footer>
  );
}