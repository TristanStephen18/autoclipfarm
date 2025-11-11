import type { JSX } from "react";
import toast from "react-hot-toast";
import { FaTiktok, FaFacebook, FaInstagram, FaLink } from "react-icons/fa";
import type { Profile } from "../../../types/profile";

interface ShareModalProps {
  clipUrl: string;
  onClose: () => void;
  profile: Profile;
}

export const ShareModal = ({ clipUrl, onClose, profile }: ShareModalProps) => {
  const copyLink = async () => {
    await navigator.clipboard.writeText(clipUrl);
    toast.success("Link copied!");
  };

  return (
    <div
      className="
        fixed inset-0 
        bg-white/10 
        flex items-center justify-center 
        z-50 
        transition-all duration-300
      "
    >
      <div
        className="
          bg-white rounded-2xl shadow-lg 
          w-[90%] max-w-md p-6 relative 
          animate-fadeIn
        "
      >
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Share Clip</h2>

        {/* Video Preview */}
        <div className="overflow-hidden rounded-lg mb-5">
          <video
            src={clipUrl}
            muted
            controls
            className="w-full h-52 object-cover rounded-lg"
          />
        </div>

        {/* Share Options */}
        <div className="grid grid-cols-2 gap-3">
          <ShareButton
            icon={<FaTiktok className="text-lg" />}
            label="TikTok"
            color="bg-black"
            isConnected={profile.tiktokConnection}
            isPlatform
          />
          <ShareButton
            icon={<FaFacebook className="text-lg" />}
            label="Facebook"
            color="bg-blue-600"
            isConnected={profile.facebookConnection}
            isPlatform
          />
          <ShareButton
            icon={<FaInstagram className="text-lg" />}
            label="Instagram"
            color="bg-gradient-to-r from-pink-500 to-yellow-400"
            isConnected={profile.instagramConnection}
            isPlatform
          />
          <ShareButton
            icon={<FaLink className="text-lg" />}
            label="Copy Link"
            onClick={copyLink}
            color="bg-gray-700"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="
              px-4 py-2 text-gray-600 text-sm font-medium
              hover:bg-gray-100 rounded-md transition
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
const ShareButton = ({
  icon,
  label,
  onClick,
  color,
  isConnected = false,
  isPlatform = false,
}: {
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
  color: string;
  isConnected?: boolean;
  isPlatform?: boolean;
}) => {
  // If it's a platform and not connected, show "Not connected"
  const displayLabel =
    isPlatform && !isConnected ? "Not connected" : label;

  return (
    <button
      onClick={onClick}
      className={`
        ${color} text-white flex flex-col items-center justify-center gap-1 
        py-3 rounded-md hover:opacity-90 transition-all duration-200 
        shadow-sm
        ${!isConnected && isPlatform ? "opacity-70 cursor-not-allowed" : ""}
      `}
    >
      {icon}
      <span className="text-sm font-medium">{displayLabel}</span>
    </button>
  );
};

