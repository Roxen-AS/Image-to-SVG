import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Upload, Download } from "lucide-react";
import "/workspaces/Image-to-SVG/frontend/src/components/ImageToSvgConverter.css";

export default function ImageToSvgConverter() {
  const [image, setImage] = useState(null);
  const [svg, setSvg] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/png")) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleConvertToSvg = async () => {
    if (!image) return;
    // Assume conversion happens here and returns an SVG string
    const svgContent = "<svg>...</svg>";
    setSvg(svgContent);
  };

  const handleDownloadSvg = () => {
    if (!svg) return;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.svg";
    link.click();
  };

  return (
    <div className="container">
      <h1 className="title">Image to SVG Converter</h1>
      <div className="preview-container">
        {/* Upload Area */}
        <Card className="upload-card">
          <CardContent className="upload-content">
            {image ? (
              <img src={image} alt="Uploaded" className="preview-image" />
            ) : (
              <label className="upload-label">
                <Upload className="upload-icon" />
                <span className="upload-text">Click or drag here to upload file (PNG)</span>
                <input type="file" accept="image/png" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </CardContent>
        </Card>

        {/* SVG Preview Area */}
        <Card className="preview-card">
          <CardContent className="preview-content">
            {svg ? (
              <div dangerouslySetInnerHTML={{ __html: svg }} className="svg-preview" />
            ) : (
              <span className="placeholder-text">SVG Preview</span>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="button-container">
        <Button onClick={handleConvertToSvg} disabled={!image} className="convert-button">
          Convert to SVG
        </Button>
        <Button onClick={handleDownloadSvg} disabled={!svg} className="download-button">
          <Download className="download-icon" /> Download SVG
        </Button>
      </div>
    </div>
  );
}
