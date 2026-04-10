import React, { useEffect } from "react";

export default function CameraView({ videoRef }) {
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied", err);
        alert("Camera access is denied. Please allow camera permissions.");
      }
    };

    startCamera();
  }, [videoRef]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="bg-white/60 border-2 border-pink-200 rounded-3xl shadow-md w-full aspect-video object-cover"
    />
  );
}
