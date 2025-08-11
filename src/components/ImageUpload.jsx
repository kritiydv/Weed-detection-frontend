import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function ImageUpload({ onResult }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useCamera, setUseCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { i18n } = useTranslation();

  // Start webcam when useCamera is true
  useEffect(() => {
    if (useCamera) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(() => setError('Camera access denied.'));
    } else {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  }, [useCamera]);

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
          <button
            onClick={handleCapture}
            className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
          >
            Capture Frame
          </button>
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
