import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import CameraView from "../components/booth/CameraView";
import CaptureButton from "../components/booth/CaptureButton";
import Countdown from "../components/booth/Countdown";
import FilterSelector from "../components/booth/FilterSelector";
import LayoutSelector from "../components/booth/LayoutSelector";
import PhotoFrameSelector from "../components/booth/PhotoFrameSelector";
import StickerCanvas from "../components/booth/StickerCanvas";
import TemplateGallery from "../components/booth/TemplateGallery";
import PhotoFrame from "../components/shared/PhotoFrame";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import "../styles/animations.css";

const layoutToFrameCount = {
  vertical: 4, vertical3: 3, vertical4: 4,
  collage: 4, horizontal: 2, square2: 2, strip3: 3,
};

export default function Booth() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]                 = useState("custom");
  const [selectedLayout, setSelectedLayout]       = useState(null);
  const [selectedFrame, setSelectedFrame]         = useState(null);
  const [selectedTemplate, setSelectedTemplate]   = useState(null);
  const [selectedFilter, setSelectedFilter]       = useState(null);
  const [stickerPlacements, setStickerPlacements] = useState([]);
  const [stickerSelectedId, setStickerSelectedId]   = useState(null);
  const videoRef = useRef(null);

  const [countdownActive, setCountdownActive] = useState(false);
  const [capturedImages, setCapturedImages]   = useState([]);
  const [isCapturing, setIsCapturing]         = useState(false);
  const captureResolveRef = useRef(null);

  const frameCount = selectedTemplate
    ? layoutToFrameCount[selectedTemplate.layout] || 1
    : layoutToFrameCount[selectedLayout?.value]   || 1;

  const capturePhotoFromVideo = () => {
    const video = videoRef.current;
    if (!video) return null;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  };

  const handleCountdownComplete = () => {
    setCountdownActive(false);
    const photo = capturePhotoFromVideo();
    if (captureResolveRef.current) { captureResolveRef.current(photo); captureResolveRef.current = null; }
  };

  const runOneShotAsync = () => new Promise((resolve) => {
    captureResolveRef.current = resolve;
    setCountdownActive(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setCountdownActive(true)));
  });

  const startPhotoSequence = async () => {
    if (isCapturing) return;
    setIsCapturing(true);
    const shots = [];
    setCapturedImages([]);
    for (let i = 0; i < frameCount; i++) {
      const photo = await runOneShotAsync();
      if (photo) { shots.push(photo); setCapturedImages([...shots]); }
    }
    setIsCapturing(false);
    setActiveTab("preview");
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSelectedLayout({ value: template.layout });
    setSelectedFrame(template.frame);
    setSelectedFilter(template.filter || null);
    setStickerPlacements([]);
    setCapturedImages([]);
  };

  const handleRetake = () => {
    setCapturedImages([]);
    captureResolveRef.current = null;
    setCountdownActive(false);
    setIsCapturing(false);
    setStickerPlacements([]);
    setActiveTab("camera");
  };

  const handleContinueToResult = () => {
    navigate("/result", {
      state: { images: capturedImages, layout: activeLayout, frame: activeFrame, filter: activeFilter, stickerPlacements },
    });
  };

  useEffect(() => {
    let stream = null;
    if (activeTab === "camera") {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((s) => { stream = s; if (videoRef.current) videoRef.current.srcObject = s; })
        .catch((err) => { alert("Camera access denied."); console.error(err); });
    }
    return () => { if (stream) stream.getTracks().forEach(t => t.stop()); };
  }, [activeTab]);

  const activeLayout = selectedTemplate?.layout || selectedLayout?.value;
  const activeFrame  = selectedTemplate?.frame  || selectedFrame;
  const activeFilter = selectedTemplate?.filter || selectedFilter;

  return (
    <PageLayout>
      <section className="py-12 px-4 sm:px-6 min-h-screen">
        <h2 className="text-4xl md:text-5xl font-extrabold text-pink-700 mb-8 drop-shadow-lg text-center">
          Let's Click Some K-Cute Moments! 💕
        </h2>

        {/* Progress bar */}
        <div className="flex items-center justify-center gap-2 mb-8 text-sm font-semibold">
          {[{ key:"custom", label:"1. Customize" }, { key:"camera", label:"2. Camera" }, { key:"preview", label:"3. Preview" }]
            .map(({ key, label }, i, arr) => (
              <React.Fragment key={key}>
                <span className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                  activeTab === key ? "bg-pink-500 text-white shadow-md"
                  : capturedImages.length > 0 && key === "preview" ? "bg-pink-200 text-pink-700"
                  : "bg-white/60 text-pink-400"
                }`}>{label}</span>
                {i < arr.length - 1 && <span className="text-pink-300">→</span>}
              </React.Fragment>
            ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-7xl mx-auto">

          {/* Tab switcher only on customize screen */}
          {(activeTab === "custom" || activeTab === "quick") && (
            <TabsList className="grid grid-cols-2 w-full max-w-xs mx-auto mb-6">
              <TabsTrigger value="custom">🎨 Customize</TabsTrigger>
              <TabsTrigger value="quick">⚡ Quick Templates</TabsTrigger>
            </TabsList>
          )}

          {/* ── Customize ── */}
          <TabsContent value="custom">
            <div className="flex gap-6 items-start max-w-5xl mx-auto">
              <div className="flex-1 flex flex-col gap-5">
                <Step title="1. Pick a Layout">
                  <LayoutSelector selectedLayout={selectedLayout} onSelect={setSelectedLayout} />
                </Step>
                <Step title="2. Select a Frame">
                  <PhotoFrameSelector selectedFrame={selectedFrame} onSelectFrame={setSelectedFrame} />
                </Step>
                <Step title="3. Apply a Filter (Optional)">
                  <FilterSelector selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
                </Step>
                <div className="flex justify-end">
                  <button onClick={() => setActiveTab("camera")}
                    disabled={!selectedLayout || !selectedFrame}
                    className="px-8 py-2.5 rounded-full bg-pink-500 text-white font-bold hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md">
                    Next → Camera 📸
                  </button>
                </div>
              </div>

              {/* Live Preview */}
              <div className="w-64 flex-shrink-0 sticky top-24 self-start bg-white/90 border-2 border-dashed border-pink-300 rounded-2xl p-4 flex flex-col items-center gap-3">
                <p className="text-pink-500 font-semibold text-xs tracking-wide">✨ Live Preview</p>
                {selectedLayout && selectedFrame
                  ? <div style={{ transform:"scale(0.75)", transformOrigin:"top center", marginBottom:-80 }}>
                      <PhotoFrame layout={selectedLayout?.value} frame={selectedFrame} filter={selectedFilter} images={[]} />
                    </div>
                  : <div className="py-10 flex flex-col items-center gap-2">
                      <span className="text-4xl">📸</span>
                      <p className="text-pink-400 text-xs italic text-center">Select layout &amp; frame to preview</p>
                    </div>
                }
              </div>
            </div>
          </TabsContent>

          {/* ── Quick Templates ── */}
          <TabsContent value="quick">
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
              <TemplateGallery onSelect={handleTemplateSelect} selectedTemplate={selectedTemplate} />
              <button onClick={() => setActiveTab("camera")} disabled={!selectedTemplate}
                className="px-8 py-2.5 rounded-full bg-pink-500 text-white font-bold hover:bg-pink-600 transition disabled:opacity-40 shadow-md">
                Next → Camera 📸
              </button>
            </div>
          </TabsContent>

          {/* ── Camera ── */}
          <TabsContent value="camera">
            <div className="max-w-2xl mx-auto bg-white/80 rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-extrabold text-pink-700 mb-1 text-center">
                📸 Take {frameCount} Photo{frameCount > 1 ? "s" : ""}
              </h3>
              <p className="text-center text-pink-400 text-sm mb-4">
                {isCapturing ? `Shot ${capturedImages.length + 1} of ${frameCount} — smile! 😊`
                  : capturedImages.length === frameCount && frameCount > 0 ? "✅ All shots done!"
                  : `${frameCount} shot${frameCount > 1 ? "s" : ""} will be taken automatically`}
              </p>
              <CameraView videoRef={videoRef} />
              <Countdown start={countdownActive} duration={3} onComplete={handleCountdownComplete} />
              {!isCapturing && capturedImages.length < frameCount && (
                <CaptureButton onClick={startPhotoSequence} disabled={false} />
              )}
              {isCapturing && !countdownActive && (
                <p className="text-pink-400 text-sm mt-4 animate-pulse text-center">⏳ Get ready for the next shot…</p>
              )}
              {capturedImages.length > 0 && (
                <div className="mt-5">
                  <p className="text-pink-600 font-semibold text-sm mb-3 text-center">
                    📷 {capturedImages.length} / {frameCount} captured
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {capturedImages.map((img, idx) => (
                      <img key={idx} src={img} alt={`Shot ${idx+1}`}
                        className="rounded-lg border-2 border-pink-200 shadow object-cover aspect-video w-full" />
                    ))}
                  </div>
                  {capturedImages.length === frameCount && !isCapturing && (
                    <div className="mt-5 flex justify-center gap-3">
                      <button onClick={handleRetake}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-full border border-gray-200 transition">
                        🔄 Retake
                      </button>
                      <button onClick={() => setActiveTab("preview")}
                        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full shadow transition">
                        👁️ Preview Strip →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── Preview ── */}
          <TabsContent value="preview">
            <div style={{maxWidth:900, margin:"0 auto", background:"rgba(255,255,255,0.85)", borderRadius:24, padding:24, boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>

              {/* Title */}
              <div style={{textAlign:"center", marginBottom:16}}>
                <h3 style={{fontSize:18, fontWeight:800, color:"#be185d", margin:0}}>🖼️ Preview & Add Stickers</h3>
                <p style={{fontSize:12, color:"#f9a8d4", margin:"4px 0 0"}}>Drag stickers onto your strip • click to select • use icons to edit</p>
              </div>

              {/* Main layout: strip LEFT, picker RIGHT */}
              <div style={{display:"flex", flexDirection:"row", gap:20, alignItems:"flex-start", justifyContent:"center"}}>

                {/* LEFT col — strip + small shots grid */}
                <div style={{flexShrink:0, display:"flex", flexDirection:"column", gap:10, alignItems:"center"}}>

                  {/* Draggable strip */}
                  <StickerCanvas
                    layout={activeLayout} frame={activeFrame}
                    filter={activeFilter} images={capturedImages}
                    placements={stickerPlacements}
                    onPlacementsChange={setStickerPlacements}
                    selectedId={stickerSelectedId}
                    onSelectId={setStickerSelectedId}
                    stripOnly={true}
                  />

                  {/* Individual shots — small thumbnails UNDER the strip */}
                  {capturedImages.length > 0 && (
                    <div style={{background:"rgba(255,255,255,0.9)", borderRadius:12, padding:10, border:"1px solid #fce7f3", width:"100%"}}>
                      <p style={{fontSize:11, color:"#ec4899", fontWeight:600, marginBottom:6}}>📷 Your shots</p>
                      <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:5}}>
                        {capturedImages.map((img, idx) => (
                          <div key={idx} style={{position:"relative"}}>
                            <img src={img} alt={`Shot ${idx+1}`} style={{width:"100%", height:60, objectFit:"cover", borderRadius:8, border:"2px solid white", boxShadow:"0 1px 4px rgba(0,0,0,0.1)"}} />
                            <span style={{position:"absolute", bottom:3, left:3, background:"#ec4899", color:"white", fontSize:9, fontWeight:700, padding:"1px 5px", borderRadius:99}}>#{idx+1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT col — sticker picker */}
                <div style={{flex:"1 1 240px", minWidth:220, maxWidth:320}}>
                  <StickerCanvas
                    layout={activeLayout} frame={activeFrame}
                    filter={activeFilter} images={capturedImages}
                    placements={stickerPlacements}
                    onPlacementsChange={setStickerPlacements}
                    selectedId={stickerSelectedId}
                    onSelectId={setStickerSelectedId}
                    pickerOnly={true}
                  />
                </div>

              </div>

              {/* Action buttons */}
              <div style={{display:"flex", justifyContent:"center", gap:10, marginTop:20}}>
                <button onClick={handleRetake} style={{fontSize:12, fontWeight:600, padding:"8px 20px", borderRadius:99, background:"white", border:"1px solid #e5e7eb", color:"#6b7280", cursor:"pointer"}}>
                  🔄 Retake
                </button>
                <button onClick={handleContinueToResult} style={{fontSize:12, fontWeight:700, padding:"8px 24px", borderRadius:99, background:"#ec4899", color:"white", border:"none", cursor:"pointer", boxShadow:"0 2px 8px rgba(236,72,153,0.4)"}}>
                  Continue → 💖
                </button>
              </div>
              <p style={{textAlign:"center", fontSize:11, color:"#f9a8d4", marginTop:8}}>Download, share and save to Memories on the next screen</p>

            </div>
          </TabsContent>

        </Tabs>
      </section>
    </PageLayout>
  );
}

const Step = ({ title, children }) => (
  <div className="text-left w-full px-5 py-5 rounded-2xl shadow-sm bg-white/80 border border-pink-50">
    <h3 className="text-base font-bold mb-4 text-pink-600">{title}</h3>
    {children}
  </div>
);