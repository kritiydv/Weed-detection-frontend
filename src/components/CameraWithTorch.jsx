import React, { useState, useRef, useEffect } from "react";

export default function CameraWithTorch() {
  const videoRef = useRef(null);
  const [facingMode, setFacingMode] = useState("environment"); // "user" for front
  const [track, setTrack] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      const videoTrack = stream.getVideoTracks()[0];
      setTrack(videoTrack);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Torch capability check
      if ("ImageCapture" in window) {
        const imageCapture = new ImageCapture(videoTrack);
        const capabilities = await imageCapture.getPhotoCapabilities();
        if (capabilities.torch) {
          enableTorch(videoTrack, true); // turn on torch
        }
      }
    } catch (err) {
      console.error("Error starting camera:", err);
    }
  };

  const enableTorch = async (videoTrack, enable) => {
    try {
      await videoTrack.applyConstraints({
        advanced: [{ torch: enable }]
      });
    } catch (err) {
      console.warn("Torch not supported:", err);
    }
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (track) track.stop();
    };
    // eslint-disable-next-line
  }, [facingMode]);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", height: "auto" }}
      />
      <button onClick={switchCamera}>
        Switch to {facingMode === "user" ? "Back" : "Front"} Camera
      </button>
    </div>
  );
}
