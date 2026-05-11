import React from "react";
import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  { href: "mailto:contact@kclickbooth.com", icon: <Mail size={14} />,      label: "Email",     glow: "rgba(244,114,182,0.6)" },
  { href: "tel:+1234567890",                icon: <Phone size={14} />,     label: "Phone",     glow: "rgba(251,113,133,0.6)" },
  { href: "#",                              icon: <Facebook size={14} />,  label: "Facebook",  glow: "rgba(236,72,153,0.6)"  },
  { href: "#",                              icon: <Instagram size={14} />, label: "Instagram", glow: "rgba(244,63,94,0.6)"   },
  { href: "#",                              icon: <Twitter size={14} />,   label: "Twitter",   glow: "rgba(225,29,72,0.6)"   },
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
      background: "linear-gradient(160deg,#fff0f6 0%,#fce7f3 25%,#ffe4e6 55%,#fecdd3 80%,#ffd6e7 100%)",
    }}>

      <style>{`
        @keyframes floatA{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(8deg)}}
        @keyframes floatB{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-7px) rotate(-6deg)}}
        @keyframes floatC{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes btnGlow{0%,100%{box-shadow:0 8px 24px rgba(236,72,153,0.5),0 2px 6px rgba(244,63,94,0.25),inset 0 1px 0 rgba(255,255,255,0.25)}50%{box-shadow:0 10px 28px rgba(236,72,153,0.62),0 3px 8px rgba(244,63,94,0.3),inset 0 1px 0 rgba(255,255,255,0.3)}}
        @keyframes heartbeat{
          0%,100%{transform:scale(1)}
          14%{transform:scale(1.18)}
          28%{transform:scale(1)}
          42%{transform:scale(1.18)}
          70%{transform:scale(1)}
        }

        /* ── Mobile footer: single centered column ── */
        .f-desktop { display: none; }
        .f-floats-desktop { display: none; }
        .f-mobile { display: flex; }
        .f-copyright-row { flex-direction: column; align-items: center; gap: 2px; }
        .f-copyright-sub { display: none; }

        /* ── Desktop footer: full 3-col layout ── */
        @media(min-width:640px) {
          .f-desktop   { display: grid; }
          .f-floats-desktop { display: block; }
          .f-mobile    { display: none; }
          .f-copyright-row { flex-direction: row; justify-content: space-between; align-items: center; gap: 8px; }
          .f-copyright-sub { display: block; }
        }
      `}</style>

      {/* ── Background blobs (both mobile + desktop) ── */}
      <div style={{ position:"absolute", top:-80, left:-80, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(244,114,182,0.2) 0%,transparent 68%)", filter:"blur(38px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-50, right:-40, width:260, height:260, borderRadius:"50%", background:"radial-gradient(circle,rgba(253,164,175,0.18) 0%,transparent 68%)", filter:"blur(35px)", pointerEvents:"none" }} />

      {/* ── Desktop-only floating decorations ── */}
      <span className="f-floats-desktop" style={{ position:"absolute", top:14, left:"8%",   fontSize:16, opacity:0.28, animation:"floatA 3.5s ease-in-out infinite", pointerEvents:"none", userSelect:"none" }}>💖</span>
      <span className="f-floats-desktop" style={{ position:"absolute", top:22, left:"22%",  fontSize:11, opacity:0.18, animation:"floatB 2.8s ease-in-out infinite", pointerEvents:"none", userSelect:"none" }}>✨</span>
      <span className="f-floats-desktop" style={{ position:"absolute", top:12, left:"50%",  fontSize:13, opacity:0.18, animation:"floatC 4s ease-in-out infinite",   pointerEvents:"none", userSelect:"none" }}>🌸</span>
      <span className="f-floats-desktop" style={{ position:"absolute", top:18, right:"20%", fontSize:10, opacity:0.18, animation:"floatA 3.2s ease-in-out infinite", animationDelay:"0.6s", pointerEvents:"none", userSelect:"none" }}>💕</span>
      <span className="f-floats-desktop" style={{ position:"absolute", top:14, right:"6%",  fontSize:14, opacity:0.22, animation:"floatB 3.8s ease-in-out infinite", animationDelay:"1s",   pointerEvents:"none", userSelect:"none" }}>🎀</span>
      <span className="f-floats-desktop" style={{ position:"absolute", bottom:16, left:"14%",  fontSize:11, opacity:0.16, animation:"floatC 3s ease-in-out infinite", animationDelay:"1.2s", pointerEvents:"none", userSelect:"none" }}>✨</span>
      <span className="f-floats-desktop" style={{ position:"absolute", bottom:14, right:"35%", fontSize:10, opacity:0.15, animation:"floatA 4.2s ease-in-out infinite",animationDelay:"0.4s", pointerEvents:"none", userSelect:"none" }}>💖</span>

      {/* ── Top border line ── */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(236,72,153,0.25) 30%,rgba(244,114,182,0.35) 50%,rgba(236,72,153,0.25) 70%,transparent)", pointerEvents:"none" }} />

      {/* ════════════════════════════════════════
          MOBILE LAYOUT — compact centered column
      ════════════════════════════════════════ */}
      <div className="f-mobile" style={{ flexDirection:"column", alignItems:"center", textAlign:"center", padding:"14px 20px 10px", gap:9, position:"relative", zIndex:1 }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8 }}>
          <div style={{ width:30, height:30, borderRadius:10, background:"linear-gradient(135deg,#ec4899,#f43f5e)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 10px rgba(236,72,153,0.35)", flexShrink:0 }}>
            <span style={{ fontSize:14 }}>📸</span>
          </div>
          <div style={{ textAlign:"left" }}>
            <p style={{ margin:0, fontSize:16, fontWeight:900, color:"#9d174d", letterSpacing:"-0.4px", lineHeight:1 }}>K-Click</p>
            <p style={{ margin:0, fontSize:7, fontWeight:700, color:"#f9a8d4", letterSpacing:"0.15em", textTransform:"uppercase" }}>Photo Booth</p>
          </div>
        </Link>

        {/* One-line subtitle */}
        <p style={{ margin:0, fontSize:11, color:"#9d174d", opacity:0.7, fontWeight:500 }}>
          Cute Korean Photo Booth Memories ✨
        </p>

        {/* Social icons row */}
        <div style={{ display:"flex", gap:5 }}>
          {socialLinks.map(({ href, icon, label, glow }) => (
            <a key={label} href={href} aria-label={label}
              style={{ width:26, height:26, borderRadius:"50%", background:"rgba(255,255,255,0.7)", border:"1px solid rgba(244,114,182,0.25)", display:"flex", alignItems:"center", justifyContent:"center", color:"#ec4899", textDecoration:"none", boxShadow:"0 2px 6px rgba(236,72,153,0.1)", transition:"all 0.2s ease", flexShrink:0 }}
              onMouseEnter={e => { const el=e.currentTarget; el.style.transform="translateY(-2px) scale(1.12)"; el.style.background="white"; el.style.boxShadow=`0 4px 14px ${glow}`; }}
              onMouseLeave={e => { const el=e.currentTarget; el.style.transform="translateY(0) scale(1)"; el.style.background="rgba(255,255,255,0.7)"; el.style.boxShadow="0 2px 6px rgba(236,72,153,0.1)"; }}>
              {icon}
            </a>
          ))}
        </div>

        {/* CTA button — slim, centered */}
        <div style={{ position:"relative", display:"inline-block" }}>
          {/* Glow behind */}
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:140, height:44, borderRadius:99, background:"radial-gradient(ellipse,rgba(236,72,153,0.24) 0%,transparent 72%)", filter:"blur(8px)", pointerEvents:"none" }} />
          <span style={{ position:"absolute", top:-7, right:-4, fontSize:11, animation:"floatB 2.2s ease-in-out infinite", pointerEvents:"none", userSelect:"none", zIndex:3 }}>✨</span>
          <Link to="/booth" style={{ textDecoration:"none", display:"inline-block", position:"relative", zIndex:2 }}>
            <button
              style={{ position:"relative", overflow:"hidden", padding:"7px 18px", borderRadius:99, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#ec4899 0%,#e11d48 55%,#f43f5e 100%)", color:"white", fontSize:12, fontWeight:800, animation:"btnGlow 2.5s ease-in-out infinite", transition:"transform 0.2s ease", letterSpacing:"0.02em" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px) scale(1.04)"; e.currentTarget.style.animation="none"; e.currentTarget.style.boxShadow="0 12px 28px rgba(236,72,153,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0) scale(1)"; e.currentTarget.style.animation="btnGlow 2.5s ease-in-out infinite"; e.currentTarget.style.boxShadow=""; }}>
              <span style={{ position:"absolute", inset:0, borderRadius:99, background:"linear-gradient(180deg,rgba(255,255,255,0.2) 0%,transparent 55%)", pointerEvents:"none" }} />
              <span style={{ position:"relative", zIndex:1 }}>Open Booth 📸</span>
            </button>
          </Link>
        </div>

        {/* Divider */}
        <div style={{ width:"72%", height:1, background:"linear-gradient(90deg,transparent,rgba(236,72,153,0.2) 50%,transparent)" }} />

        {/* Single-line copyright */}
        <p style={{ margin:0, fontSize:9, color:"#be185d", fontWeight:600, display:"flex", alignItems:"center", gap:4, flexWrap:"wrap", justifyContent:"center" }}>
          © 2025 K-Click
          <span style={{ opacity:0.4 }}>•</span>
          Made with <span style={{ display:"inline-block", animation:"heartbeat 1.8s ease-in-out infinite",
transformOrigin:"center", fontSize:11 }}>💖</span> by <span style={{ fontWeight:800 }}>Tanya</span>
        </p>
      </div>

      {/* ════════════════════════════════════════
          DESKTOP LAYOUT — full 3-col grid
      ════════════════════════════════════════ */}
      <div style={{ 
          position:"relative",
          zIndex:1,
          maxWidth:1200,
          margin:"0 auto",
          padding:"32px 28px 20px",
          minHeight:"260px",
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-between"
        }}>
        <div className="f-desktop" style={{ 
          display:"grid",
          gridTemplateColumns:"1.2fr 1fr 1.2fr", // side columns slightly wider
          gap:"24px 60px", 
          alignItems:"start",
          width:"100%",
          marginBottom:"22px"
        }}>

          {/* COL 1 — Brand */}
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <Link to="/" style={{ textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9 }}>
              <div style={{ width:34, height:34, borderRadius:11, background:"linear-gradient(135deg,#ec4899,#f43f5e)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 12px rgba(236,72,153,0.38),inset 0 1px 0 rgba(255,255,255,0.25)", flexShrink:0 }}>
                <span style={{ fontSize:16 }}>📸</span>
              </div>
              <div>
                <p style={{ margin:0, fontSize:18, fontWeight:900, color:"#9d174d", letterSpacing:"-0.5px", lineHeight:1 }}>K-Click</p>
                <p style={{ margin:0, fontSize:8, fontWeight:700, color:"#f9a8d4", letterSpacing:"0.15em", textTransform:"uppercase" }}>Photo Booth</p>
              </div>
            </Link>
            <p style={{ margin:0, fontSize:11, color:"#9d174d", lineHeight:1.65, opacity:0.75, maxWidth:195 }}>
              Korean-style photo booth for magical memories ✨
            </p>
            <div style={{ display:"flex", gap:7, marginTop:2 }}>
              {socialLinks.map(({ href, icon, label, glow }) => (
                <a key={label} href={href} aria-label={label}
                  style={{ width:29, height:29, borderRadius:"50%", background:"rgba(255,255,255,0.65)", border:"1px solid rgba(244,114,182,0.25)", display:"flex", alignItems:"center", justifyContent:"center", color:"#ec4899", textDecoration:"none", boxShadow:"0 2px 6px rgba(236,72,153,0.1)", transition:"all 0.2s ease", flexShrink:0 }}
                  onMouseEnter={e => { const el=e.currentTarget; el.style.transform="translateY(-3px) scale(1.15)"; el.style.background="white"; el.style.boxShadow=`0 5px 16px ${glow}`; el.style.borderColor="rgba(244,114,182,0.5)"; }}
                  onMouseLeave={e => { const el=e.currentTarget; el.style.transform="translateY(0) scale(1)"; el.style.background="rgba(255,255,255,0.65)"; el.style.boxShadow="0 2px 6px rgba(236,72,153,0.1)"; el.style.borderColor="rgba(244,114,182,0.25)"; }}>
                  {icon}
                </a>
              ))}
            </div>
            <p style={{ margin:0, fontSize:10, color:"#f472b6", fontWeight:600, letterSpacing:"0.05em" }}>📍 Seoul · 💌 K-Style · 🎞️ Memories</p>
          </div>

          {/* COL 2 — Navigation */}
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            <p style={{ margin:"0 0 6px", fontSize:10, fontWeight:900, color:"#f472b6", textTransform:"uppercase", letterSpacing:"0.14em" }}>Navigation</p>
            {quickLinks.map(({ to, icon, label }) => (
              <Link key={label} to={to}
                style={{ display:"inline-flex", alignItems:"center", gap:8, textDecoration:"none", fontSize:12, fontWeight:700, color:"#9d174d", padding:"6px 11px", borderRadius:11, background:"rgba(255,255,255,0.45)", border:"1px solid rgba(244,114,182,0.18)", transition:"all 0.18s ease", width:"fit-content" }}
                onMouseEnter={e => { const el=e.currentTarget; el.style.background="rgba(255,255,255,0.85)"; el.style.transform="translateX(5px)"; el.style.boxShadow="0 3px 10px rgba(236,72,153,0.14)"; el.style.borderColor="rgba(244,114,182,0.4)"; }}
                onMouseLeave={e => { const el=e.currentTarget; el.style.background="rgba(255,255,255,0.45)"; el.style.transform="translateX(0)"; el.style.boxShadow="none"; el.style.borderColor="rgba(244,114,182,0.18)"; }}>
                <span style={{ fontSize:13 }}>{icon}</span>
                <span>{label}</span>
                <span style={{ marginLeft:"auto", fontSize:10, color:"#f9a8d4", paddingLeft:8 }}>→</span>
              </Link>
            ))}
          </div>

          {/* COL 3 — CTA */}
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <p style={{ margin:"0 0 6px", fontSize:10, fontWeight:900, color:"#f472b6", textTransform:"uppercase", letterSpacing:"0.14em" }}>Start Creating</p>
            <p style={{ margin:0, fontSize:11, color:"#9d174d", lineHeight:1.65, opacity:0.75, maxWidth:195 }}>
              Snap your cutest shots and save K-memories forever 💕
            </p>
            <div style={{ position:"relative", display:"inline-block", marginTop:1, maxWidth:"200px", width:"100%" }}>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:160, height:52, borderRadius:99, background:"radial-gradient(ellipse,rgba(236,72,153,0.28) 0%,transparent 72%)", filter:"blur(10px)", pointerEvents:"none" }} />
              <span style={{ position:"absolute", top:-9, right:-6, fontSize:12, animation:"floatB 2.2s ease-in-out infinite", pointerEvents:"none", userSelect:"none", zIndex:3 }}>✨</span>
              <Link to="/booth" style={{ textDecoration:"none", display:"inline-block", position:"relative", zIndex:2 }}>
                <button
                  style={{ position:"relative", overflow:"hidden", padding:"10px 22px", borderRadius:99, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#ec4899 0%,#e11d48 55%,#f43f5e 100%)", color:"white", fontSize:12, fontWeight:800, animation:"btnGlow 2.5s ease-in-out infinite", transition:"transform 0.2s ease", letterSpacing:"0.02em" }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px) scale(1.05)"; e.currentTarget.style.animation="none"; e.currentTarget.style.boxShadow="0 14px 32px rgba(236,72,153,0.65),0 4px 10px rgba(244,63,94,0.3),inset 0 1px 0 rgba(255,255,255,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0) scale(1)"; e.currentTarget.style.animation="btnGlow 2.5s ease-in-out infinite"; e.currentTarget.style.boxShadow=""; }}>
                  <span style={{ position:"absolute", inset:0, borderRadius:99, background:"linear-gradient(180deg,rgba(255,255,255,0.22) 0%,transparent 55%)", pointerEvents:"none" }} />
                  <span style={{ position:"relative", zIndex:1 }}>Open Booth 📸</span>
                </button>
              </Link>
            </div>
          </div>

        </div>

        {/* Desktop divider + copyright */}
        <div className="f-desktop" style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(236,72,153,0.2) 20%,rgba(244,114,182,0.3) 50%,rgba(236,72,153,0.2) 80%,transparent)", marginBottom:11 }} />
        <div className="f-copyright-row f-desktop" style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          flexWrap:"wrap",
          gap:"10px",
          paddingTop:"6px"
        }}>
          <p style={{ margin:0, fontSize:11, color:"#be185d", fontWeight:700 }}>© 2025 <span style={{ fontWeight:900 }}>K-Click Booth</span></p>
          <p style={{ margin:0, fontSize:11, color:"#be185d", display:"flex", alignItems:"center", gap:4, fontWeight:500 }}>
            Built with <span style={{ display:"inline-block", animation:"heartbeat 1.8s ease-in-out infinite",
transformOrigin:"center", fontSize:12 }}>💖</span> by <span style={{ fontWeight:800 }}>Tanya</span>
          </p>
          <p className="f-copyright-sub" style={{ margin:0, fontSize:11, color:"#be185d", fontWeight:700, letterSpacing:"0.04em" }}>✨ Korean Photo Booth App</p>
        </div>
      </div>

    </footer>
  );
}