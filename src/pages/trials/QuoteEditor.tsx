import { useState } from "react";
import { Player } from "@remotion/player";
import axios from "axios";
import { QuoteComposition } from "./SampleRemotion";

export default function QuoteEditorPage() {
  const [quote, setQuote] = useState(
    "The only limit to our realization of tomorrow is our doubts of today."
  );
  const [author, setAuthor] = useState("Franklin D. Roosevelt");
  const [backgroundImage, setBackgroundImage] = useState(
    "https://res.cloudinary.com/dnxc1lw18/image/upload/v1760979566/bg11_deliyh.jpg"
  );
  const [fontFamily, setFontFamily] = useState("Arial, sans-serif");
  const [fontSize, setFontSize] = useState(1);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [exporting, setExporting] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await axios.post(
        "/api/ffmpeg/render-quote",
        {
          quote,
          author,
          backgroundImage,
          fontFamily,
          fontSize,
          fontColor,
        },
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "video/mp4" });
      const blobUrl = URL.createObjectURL(blob);
      setOutputUrl(blobUrl);
    } catch (err) {
      console.error(err);
      alert("Export failed");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar Controls */}
      <div className="w-80 p-5 bg-gray-800 space-y-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">🎨 Quote Editor</h2>

        <label className="block">
          <span>Quote:</span>
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            rows={4}
            className="w-full mt-2 p-2 rounded bg-gray-700 border border-gray-600"
          />
        </label>

        <label className="block">
          <span>Author:</span>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full mt-2 p-2 rounded bg-gray-700 border border-gray-600"
          />
        </label>

        <label className="block">
          <span>Background Image or Video URL:</span>
          <input
            value={backgroundImage}
            onChange={(e) => setBackgroundImage(e.target.value)}
            className="w-full mt-2 p-2 rounded bg-gray-700 border border-gray-600"
          />
        </label>

        <label className="block">
          <span>Font Family:</span>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full mt-2 p-2 rounded bg-gray-700 border border-gray-600"
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Courier New', monospace">Courier</option>
            <option value="'Poppins', sans-serif">Poppins</option>
          </select>
        </label>

        <label className="block">
          <span>Font Size:</span>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={fontSize}
            onChange={(e) => setFontSize(parseFloat(e.target.value))}
            className="w-full mt-2"
          />
        </label>

        <label className="block">
          <span>Font Color:</span>
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className="w-full mt-2 h-10 p-1 rounded bg-gray-700 border border-gray-600"
          />
        </label>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded mt-6 font-semibold"
        >
          {exporting ? "Rendering..." : "🚀 Export Video"}
        </button>
      </div>

      {/* Main Preview */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-900">
        <h1 className="text-2xl font-bold mb-4">🎥 Live Remotion Preview</h1>

        <Player
          component={QuoteComposition}
          durationInFrames={300}
          fps={30}
          compositionWidth={1080}
          compositionHeight={1080}
          controls
          autoPlay
          loop
          style={{
            width: 500,
            height: 500,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
          inputProps={{
            quote,
            author,
            backgroundImage,
            fontFamily,
            fontSize,
            fontColor,
          }}
        />

        {outputUrl && (
          <div className="mt-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-2">✅ Rendered Output</h3>
            <video
              src={outputUrl}
              controls
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
