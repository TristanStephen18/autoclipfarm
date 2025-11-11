import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function VideoEditor() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activePanel, setActivePanel] = useState<"trim" | "filter" | "text">("filter");

  const videoUrl = "/videos/sample.mp4";
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [text, setText] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [duration, setDuration] = useState(0);

  const [exporting, setExporting] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  // Get duration once video loads
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.onloadedmetadata = () => setDuration(video.duration);
    }
  }, [videoUrl]);

  // Apply filters dynamically
  const videoStyle = {
    filter: `brightness(${brightness / 100}) contrast(${contrast / 100})`,
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await axios.post(
        "/api/ffmpeg/render",
        { filename: "sample.mp4", start, end, brightness, contrast, text },
        { responseType: "blob" }
      );
      const blobUrl = URL.createObjectURL(res.data);
      setOutputUrl(blobUrl);
    } catch (e) {
      console.error(e);
      alert("Render failed");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-3">🎬 Editor Panels</h2>
        {["trim", "filter", "text"].map((p) => (
          <button
            key={p}
            onClick={() => setActivePanel(p as any)}
            className={`w-full text-left px-3 py-2 rounded-lg ${
              activePanel === p ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            {p.toUpperCase()}
          </button>
        ))}

        <button
          onClick={handleExport}
          disabled={exporting}
          className={`w-full mt-6 py-2 rounded-lg font-semibold transition ${
            exporting
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {exporting ? "Rendering..." : "🚀 Export Video"}
        </button>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative w-[80%] max-w-4xl aspect-video bg-black shadow-lg rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            className="w-full h-full object-contain"
            style={videoStyle}
          />
          {text && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white text-4xl font-bold drop-shadow-lg">
                {text}
              </span>
            </div>
          )}
        </div>

        {/* Panel Controls */}
        <div className="mt-6 w-[80%] max-w-3xl bg-white p-6 rounded-xl shadow">
          {activePanel === "trim" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">✂️ Trim Video</h3>
              <p className="text-sm mb-2">
                Start: {start.toFixed(1)}s | End: {end.toFixed(1)}s / {duration.toFixed(1)}s
              </p>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={start}
                  onChange={(e) => setStart(parseFloat(e.target.value))}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={end}
                  onChange={(e) => setEnd(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {activePanel === "filter" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">🎨 Filters</h3>
              <label>Brightness ({brightness}%)</label>
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full mb-4"
              />
              <label>Contrast ({contrast}%)</label>
              <input
                type="range"
                min="50"
                max="150"
                value={contrast}
                onChange={(e) => setContrast(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {activePanel === "text" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">📝 Text Overlay</h3>
              <input
                type="text"
                placeholder="Enter overlay text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>
          )}
        </div>

        {outputUrl && (
          <div className="mt-6 w-[80%] max-w-3xl">
            <h3 className="text-lg font-semibold mb-2">✅ Exported Video</h3>
            <video src={outputUrl} controls className="rounded-lg shadow w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
