import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import CameraView from "../components/booth/CameraView";
import CaptureButton from "../components/booth/CaptureButton";
import Countdown from "../components/booth/Countdown";
import FilterSelector from "../components/booth/FilterSelector";
import LayoutSelector from "../components/booth/LayoutSelector";
import PhotoFrameSelector from "../components/booth/PhotoFrameSelector";
import StickerPicker from "../components/booth/StickerPicker";
import TemplateGallery from "../components/booth/TemplateGallery";
import PhotoFrame from "../components/shared/PhotoFrame";
import DownloadButton from "../components/shared/DownloadButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import "../styles/animations.css";

const layoutToFrameCount = {
  vertical:   4,
  vertical3:  3,
  vertical4:  4,
  collage:    4,
  horizontal: 2,
  square2:    2,
  strip3:     3,
};

export default function Booth() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]               = useState("custom");
  const [selectedLayout, setSelectedLayout]     = useState(null);
  const [selectedFrame, setSelectedFrame]       = useState(null);
  const [selectedStickers, setSelectedStickers] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedFilter, setSelectedFilter]     = useState(null);
  const videoRef = useRef(null);

  const [countdownActive, setCountdownActive] = useState(false);
  const [capturedImages, setCapturedImages]   = useState([]);
  const [isCapturing, setIsCapturing]         = useState(false);
  const captureResolveRef = useRef(null);

  const frameCount =
    selectedTemplate
      ? layoutToFrameCount[selectedTemplate.layout] || 1
      : layoutToFrameCount[selectedLayout?.value]   || 1;

  const capturePhotoFromVideo = () => {
    const video = videoRef.current;
    if (!video) return null;
    const canvas = document.createElement("canvas");
    canvas.width  = video.videoWidth  || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  };

  const handleCountdownComplete = () => {
    setCountdownActive(false);
    const photo = capturePhotoFromVideo();
    if (captureResolveRef.current) {
      captureResolveRef.current(photo);
      captureResolveRef.current = null;
    }
  };

  const runOneShotAsync = () =>
    new Promise((resolve) => {
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
      if (photo) {
        shots.push(photo);
        setCapturedImages([...shots]);
      }
    }

    setIsCapturing(false);
    setActiveTab("preview");
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSelectedLayout({ value: template.layout });
    setSelectedFrame(template.frame);
    setSelectedStickers(template.stickers || []);
    setSelectedFilter(template.filter || null);
    setCapturedImages([]);
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

  const activeLayout   = selectedTemplate?.layout   || selectedLayout?.value;
  const activeFrame    = selectedTemplate?.frame    || selectedFrame;
  const activeFilter   = selectedTemplate?.filter   || selectedFilter;
  const activeStickers = selectedTemplate?.stickers || selectedStickers;

  return (
    <PageLayout>
      <section className="py-16 px-4 sm:px-6 min-h-screen text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-pink-700 mb-10 drop-shadow-lg">
          Let's Click Some K-Cute Moments! 💕
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-7xl mx-auto">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="custom">🎨 Customize</TabsTrigger>
            <TabsTrigger value="quick">⚡ Quick Templates</TabsTrigger>
          </TabsList>

          {/* Customize */}
          <TabsContent value="custom">
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ flex: "1 1 0", minWidth: 0, maxWidth: 780 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  <Step title="1. Pick a Layout">
                    <LayoutSelector selectedLayout={selectedLayout} onSelect={setSelectedLayout} />
                  </Step>
                  <Step title="2. Select a Frame">
                    <PhotoFrameSelector selectedFrame={selectedFrame} onSelectFrame={setSelectedFrame} />
                  </Step>
                  <Step title="3. Apply a Filter (Optional)">
                    <FilterSelector selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
                  </Step>
                  <Step title="4. Add Stickers (Optional)">
                    <StickerPicker selectedStickers={selectedStickers} setSelectedStickers={setSelectedStickers} />
                  </Step>
                  <div style={{ textAlign: "right" }}>
                    <button onClick={() => setActiveTab("camera")}
                      disabled={!selectedLayout || !selectedFrame}
                      className="px-6 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed">
                      Next →
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div style={{
                width: 280, flexShrink: 0, position: "sticky", top: 96,
                alignSelf: "flex-start", background: "rgba(255,255,255,0.9)",
                border: "2px dashed #f9a8d4", borderRadius: 16, padding: 16,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              }}>
                <p className="text-pink-500 font-semibold text-sm tracking-wide">✨ Live Preview</p>
                {selectedLayout && selectedFrame
                  ? <div style={{
                      transform: "scale(0.85)", transformOrigin: "top center",
                      marginBottom: -((selectedLayout?.value === "collage" ? 280 : selectedLayout?.value === "vertical3" || selectedLayout?.value === "strip3" ? 380 : 420) * 0.15),
                    }}>
                      <PhotoFrame layout={selectedLayout?.value} frame={selectedFrame}
                        filter={selectedFilter} stickers={selectedStickers} images={[]} />
                    </div>
                  : <div style={{ padding: "48px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 42 }}>📸</span>
                      <p style={{ color: "#f472b6", fontSize: 12, fontStyle: "italic", textAlign: "center" }}>
                        Select layout &amp; frame<br/>to preview here
                      </p>
                    </div>
                }
              </div>
            </div>
          </TabsContent>

          {/* Quick Templates */}
          <TabsContent value="quick" className="max-w-5xl mx-auto flex flex-col items-center gap-6">
            <TemplateGallery onSelect={handleTemplateSelect} selectedTemplate={selectedTemplate} />
            <button onClick={() => setActiveTab("camera")}
              disabled={!selectedTemplate}
              className="mt-6 px-6 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed">
              Next →
            </button>
          </TabsContent>

          {/* Camera */}
          <TabsContent value="camera" className="max-w-5xl mx-auto space-y-8">
            <Step title={`📸 Take ${frameCount} Photo${frameCount > 1 ? "s" : ""}`}>
              <div className="p-4 bg-white rounded-xl shadow-md max-w-xl mx-auto">
                <p className="text-center text-pink-500 font-semibold mb-2">
                  {isCapturing
                    ? `Shot ${capturedImages.length + 1} of ${frameCount}`
                    : capturedImages.length === frameCount && frameCount > 0
                      ? "✅ All shots done!"
                      : `Ready — ${frameCount} shot${frameCount > 1 ? "s" : ""} total`}
                </p>
                <CameraView videoRef={videoRef} />
                <Countdown start={countdownActive} duration={3} onComplete={handleCountdownComplete} />
                {!isCapturing && capturedImages.length < frameCount && (
                  <CaptureButton onClick={startPhotoSequence} disabled={false} />
                )}
                {isCapturing && !countdownActive && (
                  <p className="text-pink-400 text-sm mt-4 animate-pulse text-center">⏳ Get ready for the next shot…</p>
                )}
              </div>
            </Step>

            {capturedImages.length > 0 && (
              <div className="mt-6 p-4 rounded-xl bg-pink-50 shadow-lg">
                <p className="text-pink-600 font-semibold mb-3">
                  {capturedImages.length === frameCount ? "✅ All shots captured!" : `📷 ${capturedImages.length} / ${frameCount} captured…`}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {capturedImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`Captured ${idx + 1}`}
                      className="rounded-lg border-4 border-white shadow-md object-cover aspect-video" />
                  ))}
                </div>
                {capturedImages.length === frameCount && !isCapturing && (
                  <div className="mt-6 flex justify-center space-x-4">
                    <button onClick={() => {
                      setCapturedImages([]);
                      captureResolveRef.current = null;
                      setCountdownActive(false);
                      setIsCapturing(false);
                    }} className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition">
                      🔄 Retake
                    </button>
                    <button onClick={() => setActiveTab("preview")}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition">
                      ➡ Preview
                    </button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Preview */}
          <TabsContent value="preview" className="max-w-5xl mx-auto space-y-8">
            <Step title="🖼️ Preview Your Strip">
              <div className="p-4 bg-white rounded-xl shadow-md max-w-xl mx-auto flex flex-col items-center">
                <PhotoFrame layout={activeLayout} frame={activeFrame}
                  filter={activeFilter} stickers={activeStickers} images={capturedImages} />
                <div className="mt-6 flex justify-center flex-wrap gap-4">
                  <button onClick={() => setActiveTab("camera")}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition">
                    ⬅ Retake
                  </button>
                  <DownloadButton capturedImages={capturedImages} layout={activeLayout}
                    frame={activeFrame} filter={activeFilter} stickers={activeStickers} />
                  <button onClick={() => navigate("/result", {
                      state: { images: capturedImages, layout: activeLayout,
                        frame: activeFrame, filter: activeFilter, stickers: activeStickers }
                    })}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition">
                    ✅ Save & Result
                  </button>
                </div>
              </div>
            </Step>
          </TabsContent>
        </Tabs>
      </section>
    </PageLayout>
  );
}

const Step = ({ title, children }) => (
  <div className="text-left w-full max-w-4xl mx-auto px-4 py-6 rounded-2xl shadow-md bg-white/70">
    <h3 className="text-xl font-semibold mb-4 text-pink-600">{title}</h3>
    {children}
  </div>
);