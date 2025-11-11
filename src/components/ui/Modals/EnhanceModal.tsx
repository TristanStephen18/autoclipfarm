import { useState, type JSX } from "react";
import {
  MdEmojiEmotions,
  MdSubtitles,
  MdClose,
} from "react-icons/md";
import axios from "axios";
import { backendPrefix } from "../../../confg";

interface EnhanceModalProps {
  onClose: () => void;
  title: string;
  videoUrl: string;
}

export const EnhanceModal = ({ onClose, title, videoUrl }: EnhanceModalProps) => {
  const [options, setOptions] = useState({
    karaoke: false,
    emojis: false,
  });

  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const toggle = (key: keyof typeof options) =>
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));

  const applyEnhancements = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${backendPrefix}/api/enhance`, {
        videoUrl,
        enhancements: options,
      });

      if (response.data?.enhancedVideoUrl) {
        setResultUrl(response.data.enhancedVideoUrl);
      } else {
        alert("Enhancement failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while applying enhancements.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-[80%] max-w-3xl h-[65vh] flex overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          <MdClose size={22} />
        </button>

        {/* Left — Video */}
        <div className="w-1/2 flex flex-col justify-center items-center p-6 bg-gradient-to-b from-white to-gray-50">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center leading-tight">
            {title}
          </h2>

          <video
            src={resultUrl || videoUrl}
            controls
            className="rounded-xl shadow-md w-full max-h-[45vh] object-contain"
          />

          <p className="text-gray-400 text-xs mt-3">
            {resultUrl ? "Enhanced Video Preview" : "Original Video Preview"}
          </p>
        </div>

        {/* Right — Controls */}
        <div className="w-1/2 flex flex-col justify-between p-6 bg-white">
          <div>
            <p className="text-gray-500 text-xs mb-4 font-medium uppercase tracking-wide">
              Enhancements
            </p>

            <div className="flex flex-col gap-3">
              <Toggle
                label="Karaoke Style"
                icon={<MdSubtitles />}
                onClick={() => toggle("karaoke")}
                active={options.karaoke}
              />
              <Toggle
                label="Auto Emojis"
                icon={<MdEmojiEmotions />}
                onClick={() => toggle("emojis")}
                active={options.emojis}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-1.5 text-gray-600 font-medium rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={applyEnhancements}
              disabled={loading}
              className={`px-5 py-1.5 rounded-md text-white font-semibold shadow-sm transition-transform ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.02]"
              }`}
            >
              {loading ? "Processing..." : "Apply"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toggle Component
interface ToggleProps {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
  active: boolean;
}

const Toggle = ({ label, icon, onClick, active }: ToggleProps) => (
  <div
    onClick={onClick}
    className={`group flex justify-between items-center px-4 py-2.5 rounded-xl cursor-pointer shadow-sm transition-all duration-300 ${
      active
        ? "bg-indigo-50 text-indigo-600 shadow-md"
        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
    }`}
  >
    <div className="flex items-center gap-2">
      <span
        className={`text-base ${
          active ? "text-indigo-600" : "text-gray-500 group-hover:text-gray-700"
        }`}
      >
        {icon}
      </span>
      <span className="font-medium text-sm">{label}</span>
    </div>

    <div
      className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
        active ? "bg-indigo-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transform transition-all duration-300 ${
          active ? "translate-x-5" : ""
        }`}
      ></div>
    </div>
  </div>
);
