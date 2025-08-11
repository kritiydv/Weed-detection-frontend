// src/pages/Upload.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function Upload() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  const [preview, setPreview] = useState(null);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("http://localhost:5000/detect", formData, {
      responseType: "blob",
    });

    const imageUrl = URL.createObjectURL(res.data);
    setPreview(imageUrl);
  };

  return (
    <div className="p-4">
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={uploadImage}>Detect</button>
      {preview && <img src={preview} alt="Detected" />}
    </div>
  );
}
