import React, { useState } from "react";
import {
  Eye,
  Sliders,
  Sparkles,
  Type,
  Wand2,
  Settings,
  Download,
  Play,
} from "lucide-react";

export const TemplateEditor: React.FC<{ isMobile: boolean }> = ({
  isMobile,
}) => {
  const [selectedColor, setSelectedColor] = useState("#8B5CF6");
  const [shadowIntensity, setShadowIntensity] = useState(50);

  const [activeTab, setActiveTab] = useState<
    "Fonts" | "Animations" | "Effects"
  >("Animations");

  const tabs: { name: "Fonts" | "Animations" | "Effects"; Icon: any }[] = [
    { name: "Fonts", Icon: Type },
    { name: "Animations", Icon: Wand2 },
    { name: "Effects", Icon: Settings },
  ];

  const animations = [
    { name: "Bounce", desc: "Fun bouncing effect", tag: "medium" },
    { name: "Fade In", desc: "Smooth fade appearance", tag: "subtle" },
    { name: "Slide Up", desc: "Text slides from bottom", tag: "medium" },
    { name: "Zoom Pop", desc: "Explosive zoom effect", tag: "strong" },
    { name: "Sparkle", desc: "Magical sparkle effect", tag: "medium" },
    { name: "Neon Glow", desc: "Glowing outline effect", tag: "strong" },
    { name: "Pulse", desc: "Rhythmic pulsing", tag: "subtle" },
    { name: "Wave", desc: "Wavy text motion", tag: "medium" },
    { name: "Shine", desc: "Shimmering effect", tag: "medium" },
  ];

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "subtle":
        return "bg-green-50 text-green-700";
      case "medium":
        return "bg-yellow-50 text-yellow-700";
      case "strong":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className={`w-full ${
        isMobile ? "p-2 space-y-2" : "p-2 space-y-2"
      } bg-gray-50`}
    >
      <div
        className={`flex ${
          isMobile
            ? "flex-col gap-3"
            : "flex-row items-center justify-between mb-6"
        }`}
      >
        <div>
          <h2
            className={`${
              isMobile ? "text-lg" : "text-xl"
            } font-semibold text-gray-900`}
          >
            Template Editor
          </h2>
          <p className="text-sm text-gray-500">
            Customize fonts and animations for your video captions
          </p>
        </div>

        <div
          className={`${
            isMobile ? "flex gap-2 mt-2" : "flex items-center gap-2"
          }`}
        >
          <button className="flex items-center border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
            <Download className="h-4 w-4 mr-2" />
            Export Template
          </button>

          <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white rounded-md px-4 py-2 text-sm transition">
            <Play className="h-4 w-4 mr-2" />
            Preview Video
          </button>
        </div>
      </div>

      <div
        className={`flex w-full gap-6 ${
          isMobile ? "flex-col" : "flex-row items-start"
        }`}
      >
        <div className={`flex-1 ${isMobile ? "p-3" : ""}`}>
          <div className="px-4 py-4">
            <div className="w-full max-w-3xl mx-0">
              <div
                className="flex w-full bg-gray-100 border border-gray-200 rounded-full p-1"
                role="tablist"
                aria-label="Editor tabs"
              >
                {tabs.map((t) => {
                  const Icon = t.Icon;
                  const isActive = activeTab === t.name;
                  return (
                    <button
                      key={t.name}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(t.name)}
                      className={`flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-full transition-all select-none
          ${
            isActive
              ? "bg-white text-purple-600 shadow-sm ring-1 ring-purple-100"
              : "text-gray-600 hover:bg-white/60 hover:text-gray-700"
          }
        `}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="px-4 pb-6 sm:px-6">
            {activeTab === "Animations" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {animations.map((anim) => {
                  const isSelected = anim.name === "Bounce";
                  return (
                    <div
                      key={anim.name}
                      className={`relative bg-white border rounded-lg p-4 cursor-pointer transition-shadow hover:shadow-md ${
                        isSelected
                          ? "border-purple-500 ring-1 ring-purple-200"
                          : "border-gray-200"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {anim.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {anim.desc}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTagColor(
                            anim.tag
                          )}`}
                        >
                          {anim.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "Fonts" && (
              <div className="space-y-8">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-pink-500 text-lg">♡</span> Girls
                    Collection
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {[
                      {
                        name: "Pink Bubble",
                        desc: "Cute & Bubbly",
                        tag: "fun",
                        color:
                          "border-pink-300 ring-1 ring-pink-100 text-pink-600",
                        selected: true,
                      },
                      {
                        name: "Pastel Dream",
                        desc: "Soft & Sweet",
                        tag: "elegant",
                        color: "text-pink-400",
                      },
                      {
                        name: "Glitter Pop",
                        desc: "✨ Sparkly ✨",
                        tag: "trendy",
                        color: "text-fuchsia-500",
                      },
                      {
                        name: "Kawaii Style",
                        desc: "(｡♥‿♥｡)",
                        tag: "fun",
                        color: "text-rose-400",
                      },
                    ].map((font, i) => (
                      <div
                        key={i}
                        className={`relative rounded-xl border p-4 cursor-pointer hover:shadow-md transition 
              ${
                font.selected
                  ? `${font.color} border-pink-400 bg-pink-50`
                  : "border-gray-200 bg-white"
              }
            `}
                      >
                        <button className="absolute top-2 right-2 text-pink-400 hover:text-pink-500 transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 
                3.99 4 6.5 4c1.74 0 3.41 1.01 4.22 2.56C11.09 
                5.01 12.76 4 14.5 4 17.01 4 19 6 19 
                8.5c0 3.78-3.4 6.86-8.55 
                11.54L12 21.35z"
                            />
                          </svg>
                        </button>

                        <div className="font-medium text-gray-900">
                          {font.name}
                        </div>
                        <div className={`text-sm font-semibold ${font.color}`}>
                          {font.desc}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {font.tag}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-blue-500 text-lg">♂</span> Men
                    Collection
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        name: "Clean White",
                        desc: "BOLD & CLEAN",
                        tag: "bold",
                        color: "bg-white text-black border border-gray-300",
                      },
                      {
                        name: "Modern Minimal",
                        desc: "SLEEK DESIGN",
                        tag: "elegant",
                        color: "bg-white text-black border border-gray-300",
                      },
                      {
                        name: "Strong Impact",
                        desc: "POWERFUL",
                        tag: "modern",
                        color: "bg-black text-white border border-gray-800",
                      },
                      {
                        name: "Tech Futuristic",
                        desc: "FUTURE",
                        tag: "modern",
                        color: "bg-black text-white border border-gray-800",
                      },
                    ].map((font, i) => (
                      <div
                        key={i}
                        className="relative rounded-xl border border-gray-200 p-4 cursor-pointer hover:shadow-md transition bg-white"
                      >
                        <button className="absolute top-2 right-2 text-blue-400 hover:text-blue-500 transition">
                          ⚡
                        </button>

                        <div className="font-medium text-gray-900">
                          {font.name}
                        </div>
                        <div
                          className={`mt-1 text-sm font-bold px-2 py-1 rounded ${font.color}`}
                        >
                          {font.desc}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {font.tag}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <span className="text-purple-500 text-lg">☆</span> Universal
                    Collection
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        name: "Neon Glow",
                        desc: "NEON VIBES",
                        tag: "trendy",
                        color: "text-cyan-400",
                      },
                      {
                        name: "Retro Wave",
                        desc: "RETRO 80s",
                        tag: "trendy",
                        color: "text-pink-500",
                      },
                    ].map((font, i) => (
                      <div
                        key={i}
                        className="relative rounded-xl border border-gray-200 p-4 cursor-pointer hover:shadow-md transition bg-white"
                      >
                        <button className="absolute top-2 right-2 text-purple-400 hover:text-purple-500 transition">
                          ✨
                        </button>

                        <div className="font-medium text-gray-900">
                          {font.name}
                        </div>
                        <div className={`text-sm font-semibold ${font.color}`}>
                          {font.desc}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {font.tag}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Effects" && (
              <div className="space-y-5">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h3 className="text-gray-800 font-medium mb-3 text-sm flex items-center gap-1">
                    🎨 Color Effects
                  </h3>

                  <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2">
                    {[
                      "#EF4444",
                      "#F97316",
                      "#FACC15",
                      "#22C55E",
                      "#06B6D4",
                      "#3B82F6",
                      "#8B5CF6",
                      "#EC4899",
                      "#A855F7",
                      "#14B8A6",
                      "#F59E0B",
                      "#64748B",
                    ].map((color, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border transition-all ${
                          selectedColor === color
                            ? "ring-2 ring-purple-500 scale-105"
                            : "hover:scale-105 border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-600">Selected:</span>
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: selectedColor }}
                    ></div>
                    <span className="text-xs font-medium text-gray-700">
                      {selectedColor?.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h3 className="text-gray-800 font-medium mb-4 text-sm flex items-center gap-1">
                    💡 Shadow & Glow Settings
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-3">
                    <div className="flex-1 w-full">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Shadow Intensity
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={shadowIntensity}
                        onChange={(e) =>
                          setShadowIntensity(Number(e.target.value))
                        }
                        className="w-full accent-purple-600 cursor-pointer h-1.5"
                      />
                      <div className="flex justify-between text-[10px] text-gray-500 mt-0.5">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div className="text-center sm:text-right">
                      <div className="text-xs font-medium text-gray-700">
                        Current
                      </div>
                      <div className="text-sm font-semibold text-purple-600 leading-none">
                        {shadowIntensity}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={`${isMobile ? "w-full" : "w-[280px]"} flex-shrink-0`}>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <div className="w-full mx-auto max-w-[240px] aspect-[9/16] bg-black rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-pink-500 font-semibold">
                  Your text here
                </span>
              </div>

              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                <button className="w-9 h-9 rounded-full bg-gray-800/85 flex items-center justify-center hover:scale-95 transition">
                  <Eye className="h-4 w-4 text-white" />
                </button>
                <button className="w-9 h-9 rounded-full bg-gray-800/85 flex items-center justify-center hover:scale-95 transition">
                  <Sparkles className="h-4 w-4 text-white" />
                </button>
                <button className="w-9 h-9 rounded-full bg-gray-800/85 flex items-center justify-center hover:scale-95 transition">
                  <Sliders className="h-4 w-4 text-white" />
                </button>
              </div>

              <div className="absolute bottom-2 left-3 text-xs text-gray-300">
                <div>@username</div>
                <div>#viral #trending</div>
              </div>
            </div>

            <div className="text-center mt-3 text-sm font-medium text-gray-600">
              Live Preview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
