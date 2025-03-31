import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Download } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 gap-6">
      <h1 className="text-3xl font-bold text-gray-800">Image to SVG Converter</h1>

      <div className="flex gap-6">
        <Card className="w-64 h-64 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg bg-white">
          <CardContent className="flex items-center justify-center w-full h-full">
            {image ? (
              <img src={image} alt="Uploaded" className="max-w-full max-h-full object-contain" />
            ) : (
              <label className="cursor-pointer text-gray-500 flex flex-col items-center">
                <Upload className="w-8 h-8" />
                <span>Upload PNG</span>
                <input type="file" accept="image/png" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </CardContent>
        </Card>

        <Card className="w-64 h-64 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg bg-white">
          <CardContent className="flex items-center justify-center w-full h-full">
            {svg ? (
              <div dangerouslySetInnerHTML={{ __html: svg }} className="max-w-full max-h-full" />
            ) : (
              <span className="text-gray-500">SVG Preview</span>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleConvertToSvg} disabled={!image} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-blue-700">
          Convert to SVG
        </Button>
        <Button onClick={handleDownloadSvg} disabled={!svg} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow-md flex items-center hover:bg-green-700">
          <Download className="w-5 h-5 mr-2" /> Download SVG
        </Button>
      </div>
    </div>
  );
}
