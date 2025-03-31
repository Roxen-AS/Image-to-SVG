import React, { useState } from "react";
import { uploadImage } from "../api";
import SvgViewer from "./SvgViewer";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [svgCode, setSvgCode] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const response = await uploadImage(file);
    if (response.errors) {
      alert("Error: " + response.errors[0].message);
    } else {
      setSvgCode(response.data.uploadImage.svgCode);
    }
  };

  return (
    <div className="upload-container">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Convert to SVG</button>

      {svgCode && <SvgViewer svgCode={svgCode} />}
    </div>
  );
};

export default UploadForm;
