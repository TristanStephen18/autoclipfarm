import { useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  MdPlayArrow,
  MdFavoriteBorder,
  MdFavorite,
  MdClose,
  MdDownload,
} from "react-icons/md";
import { FaShareAlt, FaMagic } from "react-icons/fa";
import { EnhanceModal } from "../Modals/EnhanceModal";
import { ShareModal } from "../Modals/ShareModal";
import type { Clips } from "../../../hooks/jobs/clips";
import type { Profile } from "../../../types/profile";
import { updateClip } from "../../../lib/utils/ClipUpdater";
import toast from "react-hot-toast";

export const ClipCard = ({
  clip,
  jobs,
  profile,
}: {
  clip: Clips;
  jobs: any[];
  profile: Profile;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showEnhance, setShowEnhance] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(clip.favourite);
  const [isLoading, setIsLoading] = useState(!clip.clipUrl); // 🔹 Show loader if URL missing

  const handleOpenPlayer = () => {
    if (isLoading || !clip.clipUrl) return;
    videoRef.current?.pause();
    setTimeout(() => setShowPlayer(true), 100);
  };

  const handleClosePlayer = () => setShowPlayer(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 overflow-hidden flex flex-col">
        {/* Thumbnail Section */}
        <div
          className={`relative group cursor-pointer ${
            isLoading ? "pointer-events-none" : ""
          }`}
          onClick={handleOpenPlayer}
        >
          {/* If still loading */}
          {isLoading ? (
            <div className="w-full h-52 bg-gray-100 flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-purple-500 rounded-full animate-spin" />
              <p className="text-xs text-gray-500 mt-3">Loading clip...</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={clip.clipUrl}
              muted
              playsInline
              preload="metadata"
              onLoadedData={() => setIsLoading(false)} // 🔹 Stop loading once ready
              className="w-full h-52 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-[1.02]"
            />
          )}

          {/* Hover Overlay */}
          {!isLoading && (
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <button className="bg-white/90 text-gray-900 px-4 py-1.5 rounded-md flex items-center gap-1 text-sm font-medium shadow-sm hover:bg-gray-100 transition">
                <MdPlayArrow className="text-lg" /> Preview
              </button>
            </div>
          )}

          {/* Duration Tag */}
          {!isLoading && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
              {Math.floor(clip.duration / 60)}:
              {(clip.duration % 60).toString().padStart(2, "0")}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-gray-900 font-semibold text-sm truncate">
            {clip.description || "Untitled Clip"}
          </h3>
          <p className="text-gray-500 text-xs truncate mt-1">
            {clip.jobId}.mp4
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
          <p className="text-gray-400 text-xs mt-1">
            {formatDistanceToNow(new Date(clip.createdAt))} ago
          </p>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <IconButton
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEnhance(true);
                }}
                icon={<FaMagic className="text-base" />}
                tooltip="Enhance"
              />
              <IconButton
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowShare(true);
                }}
                icon={<FaShareAlt className="text-base" />}
                tooltip="Share"
              />
              <a
                href={clip.clipUrl}
                download
                onClick={(e) => e.stopPropagation()}
                title="Download"
                className={`p-2 rounded-md transition ${
                  isLoading
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <MdDownload className="text-lg" />
              </a>
            </div>

            {/* Favorite Button */}
            <button
              onClick={async (e) => {
                let payload = {favourite: true};
                let message = `Clip: ${clip.description} marked as favourite`;
                if(isFavorite === true){
                  payload = {favourite: false};
                  message = `Removed favourite from ${clip.description}`;
                }
                const response = await updateClip(clip.clipId, payload);
                if (response === "success") {
                  toast.success(
                    message
                  );
                  e.stopPropagation();
                  setIsFavorite((prev) => !prev);
                } else {
                  toast.error(
                    `There was an error marking the clip as favourite`
                  );
                }
              }}
              className={`p-2 rounded-full transition ${
                isFavorite
                  ? "text-red-500 bg-red-50"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              title="Favorite"
            >
              {isFavorite ? (
                <MdFavorite className="text-lg" />
              ) : (
                <MdFavoriteBorder className="text-lg" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEnhance && (
        <EnhanceModal
          onClose={() => setShowEnhance(false)}
          title={clip.description}
          videoUrl={clip.clipUrl}
        />
      )}
      {showShare && (
        <ShareModal
          clipUrl={clip.clipUrl}
          onClose={() => setShowShare(false)}
          profile={profile}
        />
      )}

      {/* Player Modal */}
      {showPlayer && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
          onClick={handleClosePlayer}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-black rounded-lg overflow-hidden shadow-lg w-[90%] max-w-3xl"
          >
            <button
              onClick={handleClosePlayer}
              className="absolute top-3 right-3 z-50 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
            >
              <MdClose className="text-lg" />
            </button>

            <video
              src={clip.clipUrl}
              controls
              autoPlay
              className="w-full h-[420px] object-contain bg-black"
            />
          </div>
        </div>
      )}
    </>
  );
};

/* ---------- Helper Button ---------- */
const IconButton = ({
  onClick,
  icon,
  tooltip,
  disabled,
}: {
  onClick: (e: React.MouseEvent) => void;
  icon: React.ReactNode;
  tooltip?: string;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={tooltip}
    className={`p-2 rounded-md transition ${
      disabled
        ? "bg-gray-100 text-gray-300 cursor-not-allowed"
        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
    }`}
  >
    {icon}
  </button>
);
