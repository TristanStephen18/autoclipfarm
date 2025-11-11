import { useState } from "react";
import type { Clips } from "../../../hooks/jobs/clips";
import { Download, Play, X } from "lucide-react";

export const RecentClipsPanel: React.FC<{ clips: Clips[]; jobs: any[] }> = ({
  clips,
  jobs,
}) => {
  const sortedClips = [...clips].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const recent = sortedClips.slice(0, 6);
  const [selectedClip, setSelectedClip] = useState<Clips | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});

  const toggleDescription = (id: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="mt-4 bg-white rounded-xl shadow-md border border-gray-100 p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          🎥 Recent Clips
        </h2>
      </div>

      {recent.length === 0 ? (
        <p className="text-sm text-gray-500 italic text-center py-6">
          No clips available yet. Start a job to generate clips!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((clip) => {
            const isExpanded = expandedDescriptions[clip.clipId];
            const description = clip.description || "Untitled Clip";

            return (
              <div
                key={clip.clipId}
                className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition bg-gradient-to-br from-gray-50 to-white border border-gray-200"
              >
                {/* Video Thumbnail */}
                <div className="relative">
                  <video
                    src={clip.clipUrl}
                    muted
                    className="w-full h-44 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-[1.03]"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                    <button
                      onClick={() => setSelectedClip(clip)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-white text-gray-800 text-xs font-medium rounded-md hover:bg-purple-100 transition"
                    >
                      <Play size={12} /> Play
                    </button>

                    <a
                      href={clip.clipUrl}
                      download
                      className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-xs font-medium rounded-md hover:bg-purple-700 transition"
                    >
                      <Download size={12} /> Download
                    </a>
                  </div>

                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] px-2 py-0.5 rounded-md">
                    {clip.duration ? `${clip.duration}s` : "—"}
                  </span>
                </div>

                <div className="p-3 space-y-1">
                  <p
                    className={`text-sm font-medium text-gray-800 ${
                      isExpanded ? "" : "line-clamp-2"
                    }`}
                  >
                    {description}
                  </p>

                  {description.length > 80 && (
                    <button
                      onClick={() => toggleDescription(clip.clipId)}
                      className="text-xs text-purple-600 font-medium hover:underline"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}

                  <p className="text-xs text-gray-500 pt-1">
                    Generated{" "}
                    {clip.createdAt
                      ? new Date(clip.createdAt).toLocaleDateString()
                      : "—"}
                  </p>

                  {jobs &&
                    (() => {
                      const job = jobs.find((j) => j.id === clip.jobId);
                      return (
                        <p className="text-xs text-gray-500 pt-1">
                          From: {job?.title ?? "Unknown job"}
                        </p>
                      );
                    })()}

                  <p className="text-xs text-gray-500 pt-1">
                    AI Instruction:{" "}
                    {jobs.find((job) => job.id === clip.jobId)
                      ?.aiInstructions || "No AI instruction available"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedClip && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedClip(null)} // click outside to close
        >
          <div
            className="relative bg-white rounded-lg overflow-hidden shadow-lg w-[90%] max-w-2xl"
            onClick={(e) => e.stopPropagation()} // prevent modal from closing when clicking inside
          >
            <button
              onClick={() => setSelectedClip(null)}
              className="absolute top-2 right-2 z-50 text-white bg-black/60 hover:bg-black/80 rounded-full p-1 transition"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Video Player */}
            <div className="relative">
              <video
                src={selectedClip.clipUrl}
                controls
                autoPlay
                className="w-full h-[360px] object-contain bg-black"
              />
            </div>

            {/* Description */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                {selectedClip.description || "Untitled Clip"}
              </h3>
              <p className="text-xs text-gray-500">
                Duration: {selectedClip.duration || "—"}s
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
