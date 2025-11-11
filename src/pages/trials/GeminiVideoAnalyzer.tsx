import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

export const VideoAnalyzerPage: React.FC = () => {
  const [videoPath, setVideoPath] = useState("");
  const [clips, setClips] = useState(3);
  const [range, setRange] = useState(5);
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [clipsData, setClipsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!videoPath) {
      alert("Please provide a video filename.");
      return;
    }

    try {
      setLoading(true);
      setResults([]);
      setClipsData([]);

      const res = await axios.post("/api/ai/analyze-video", {
        videoPath,
        clips: Number(clips),
        range: Number(range),
        prompt,
      });

      if (res.data.success) {
        setResults(res.data.results);
        setClipsData(res.data.clips);
      } else {
        alert("Failed to analyze video.");
      }
    } catch (err: any) {
      console.error(err);
      alert("Error analyzing video. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🎥 AI Video Analyzer
        </h1>

        {/* Form Section */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Video filename (e.g., sample.mp4)"
            value={videoPath}
            onChange={(e) => setVideoPath(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Number of Clips</label>
              <input
                type="number"
                value={clips}
                onChange={(e) => setClips(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Range (seconds)</label>
              <input
                type="number"
                value={range}
                onChange={(e) => setRange(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <textarea
            placeholder="Optional: Enter a custom AI prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Analyzing Video...
              </>
            ) : (
              "Analyze Video"
            )}
          </button>
        </div>

        {/* Loading Progress */}
        {loading && (
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse w-1/2"></div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-2">
              Processing video clips and analyzing content...
            </p>
          </div>
        )}

        {/* Results Section */}
        {!loading && results.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Analysis Results
            </h2>

            <div className="space-y-6">
              {results.map((r, idx) => {
                const clip = clipsData.find((c) => c.clipIndex === r.clipIndex);

                return (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-gray-50"
                  >
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      🎬 Clip {idx + 1} — {r.start}s to {r.end}s
                    </h3>

                    {clip?.url ? (
                      <video
                        controls
                        src={clip.url}
                        className="w-full rounded-lg mb-3"
                      />
                    ) : (
                      <p className="text-gray-500 italic">
                        No video available for this clip.
                      </p>
                    )}

                    <p className="text-gray-800 whitespace-pre-line">
                      {r.analysis}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
