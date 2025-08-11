import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function ImageUpload({ onResult }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useCamera, setUseCamera] = useState(false);
  const [facingMode, setFacingMode] = useState("environment"); // back camera default
  const [track, setTrack] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { i18n } = useTranslation();

  // Start/Stop camera when useCamera or facingMode changes
  useEffect(() => {
    if (useCamera) {
      startCamera();
    } else {
      stopCamera();
    }
    // Cleanup on unmount
    return () => stopCamera();
    // eslint-disable-next-line
  }, [useCamera, facingMode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      const videoTrack = stream.getVideoTracks()[0];
      setTrack(videoTrack);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Auto-enable torch in dark
      if ("ImageCapture" in window) {
        const imageCapture = new ImageCapture(videoTrack);
        try {
          const capabilities = await imageCapture.getPhotoCapabilities();
          if (capabilities.torch) {
            const lightLevel = await detectLightLevel();
            if (lightLevel < 50) {
              await videoTrack.applyConstraints({
                advanced: [{ torch: true }]
              });
            }
          }
        } catch (err) {
          console.warn("Torch not supported:", err);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Camera access denied.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
    }
    setTrack(null);
  };

  // Detect average brightness from current frame
  const detectLightLevel = async () => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!videoRef.current) return resolve(100);

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let total = 0;
      for (let i = 0; i < frame.data.length; i += 4) {
        total += frame.data[i] + frame.data[i + 1] + frame.data[i + 2];
      }
      const avg = total / (frame.data.length / 4) / 3;
      resolve(avg);
    });
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        setImage(blob);
        setPreview(URL.createObjectURL(blob));
      }
    }, 'image/jpeg');
  };

  const handleUpload = async () => {
    if (!image) {
      setError('Please select or capture an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      setError('');

      const res = await axios.post(
        `http://localhost:5000/detect?lang=${i18n.language}`,
        formData
      );

      if (res.data?.status === 'success') {
        onResult(res.data);
      } else {
        setError('Detection failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Server error or connection issue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl text-center bg-white shadow">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setUseCamera(false)}
          className={`px-4 py-1 rounded ${!useCamera ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Upload Image
        </button>
        <button
          onClick={() => setUseCamera(true)}
          className={`px-4 py-1 rounded ${useCamera ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Use Camera
        </button>
      </div>

      {useCamera ? (
        <>
          <video ref={videoRef} autoPlay playsInline className="w-full max-h-60 rounded" />
          <canvas ref={canvasRef} hidden />

          <div className="mt-2 flex justify-center gap-2">
            <button
              onClick={handleCapture}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
            >
              Capture Frame
            </button>
            <button
              onClick={() => setFacingMode(facingMode === "user" ? "environment" : "user")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
            >
              Switch to {facingMode === "user" ? "Back" : "Front"} Camera
            </button>
          </div>
        </>
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setError('');
          }}
          className="mb-2"
        />
      )}

      {preview && (
        <img src={preview} alt="preview" className="mt-2 max-h-60 mx-auto rounded" />
      )}

      <button
        onClick={handleUpload}
        className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Detecting...' : 'Detect Weeds'}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
