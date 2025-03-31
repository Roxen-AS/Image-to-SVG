import React from "react";

const SvgViewer = ({ svgCode }) => {
  const handleDownload = () => {
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h3>Converted SVG:</h3>
      <div dangerouslySetInnerHTML={{ __html: svgCode }} />
      <button onClick={handleDownload}>Download SVG</button>
    </div>
  );
};

export default SvgViewer;
