import React, { useState } from "react";
import {
  Filter,
  FolderOpen,
  Grid,
  List,
  Search,
  Upload,
  Download,
  Trash2,
  Eye,
  Share2,
  Star,
} from "lucide-react";

export const Library: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const selectedClips = [];

  const libraryClips = [
    {
      id: 1,
      title: "AI Techniques for Better Content Creation",
      isPublic: true,
      views: 547200,
      viralScore: 9.2,
      category: "AI",
      tag: "Tech",
      date: "1/14/2024",
      size: "24.5 MB",
      duration: "28s",
      gradient: "from-pink-400 to-purple-500",
    },
    {
      id: 2,
      title: "Machine Learning in 60 Seconds",
      isPublic: true,
      views: 423100,
      viralScore: 8.7,
      category: "ML",
      tag: "Quick",
      date: "1/13/2024",
      size: "52.1 MB",
      duration: "60s",
      gradient: "from-sky-400 to-blue-500",
    },
    {
      id: 3,
      title: "Quick Tech Tips That Work",
      isPublic: false,
      views: 389300,
      viralScore: 8.4,
      category: "Tips",
      tag: "Tech",
      date: "1/12/2024",
      size: "38.9 MB",
      duration: "45s",
      gradient: "from-green-400 to-cyan-500",
    },
    {
      id: 4,
      title: "Viral Content Strategy Secrets",
      isPublic: true,
      views: 325800,
      viralScore: 8.1,
      category: "Strategy",
      tag: "Marketing",
      date: "1/11/2024",
      size: "65.3 MB",
      duration: "72s",
      gradient: "from-orange-400 to-red-400",
    },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  const totalClips = libraryClips.length;
  const publicCount = libraryClips.filter((c) => c.isPublic).length;
  const totalViews = libraryClips.reduce((s, c) => s + c.views, 0);
  const avgViralScore =
    libraryClips.reduce((s, c) => s + c.viralScore, 0) / libraryClips.length;

  const filtered = libraryClips
    .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((c) =>
      filterBy === "all" ? true : filterBy === "public" ? c.isPublic : !c.isPublic
    )
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "oldest") return a.id - b.id;
      if (sortBy === "views") return b.views - a.views;
      if (sortBy === "viral") return b.viralScore - a.viralScore;
      return 0;
    });

  return (
    <div
      className={`${
        isMobile ? "p-3 space-y-4" : "p-2 space-y-6"
      } transition-all duration-300`}
    >
      <div
        className={`flex ${
          isMobile ? "flex-col space-y-3" : "flex-row items-center justify-between"
        }`}
      >
        <div>
          <h1
            className={`font-bold text-gray-900 ${
              isMobile ? "text-xl" : "text-3xl"
            }`}
          >
            Content Library
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            Manage your generated clips and templates
          </p>
        </div>

        <div className={`flex ${isMobile ? "flex-col space-y-2" : "space-x-3"}`}>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </button>
          <button className="flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition">
            <FolderOpen className="h-4 w-4 mr-2" />
            New Folder
          </button>
        </div>
      </div>

      <div
        className={`flex ${
          isMobile ? "flex-col space-y-3" : "flex-row justify-between items-center"
        }`}
      >
        <div
          className={`flex ${
            isMobile
              ? "flex-col space-y-3 w-full"
              : "flex-row items-center space-x-4"
          }`}
        >
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search clips..."
              className="pl-10 w-full sm:w-64 border border-gray-300 rounded-md py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="appearance-none border border-gray-300 rounded-md py-2 pl-8 pr-6 text-sm w-full sm:w-40 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Clips</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none border border-gray-300 rounded-md py-2 pl-3 pr-6 text-sm w-full sm:w-40 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="views">Most Views</option>
              <option value="viral">Highest Viral Score</option>
            </select>
          </div>
        </div>

        <div
          className={`flex ${
            isMobile ? "justify-between pt-2" : "items-center space-x-2"
          }`}
        >
          {selectedClips.length > 0 && (
            <div className="flex space-x-2">
              <span className="text-sm text-gray-600">
                {selectedClips.length} selected
              </span>
              <button className="flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition">
                <Download className="h-4 w-4 mr-1" />
                Download
              </button>
              <button className="flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          )}

          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              className={`px-3 py-1 ${
                viewMode === "grid"
                  ? "bg-gray-200 text-gray-900"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              className={`px-3 py-1 ${
                viewMode === "list"
                  ? "bg-gray-200 text-gray-900"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{totalClips}</div>
          <div className="text-sm text-gray-600">Total Clips</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{publicCount}</div>
          <div className="text-sm text-gray-600">Public</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(totalViews)}
          </div>
          <div className="text-sm text-gray-600">Total Views</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-gray-900">
            {avgViralScore.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Avg Viral Score</div>
        </div>
      </div>

      <div
        className={`grid gap-6 pt-4 ${
          isMobile
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {filtered.map((clip) => (
          <div
            key={clip.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm relative group"
          >
            {/* Gradient thumbnail */}
            <div className={`h-40 bg-gradient-to-br ${clip.gradient} relative`}>
              <div className="absolute top-2 left-2 flex items-center space-x-2 text-xs font-semibold">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    clip.isPublic ? "bg-green-600" : "bg-gray-600"
                  }`}
                >
                  {clip.isPublic ? "Public" : "Private"}
                </span>
                <span className="px-2 py-1 bg-black bg-opacity-80 text-white rounded-full">
                  {clip.duration}
                </span>
              </div>
              <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {clip.viralScore.toFixed(1)}/10
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                {clip.title}
              </h3>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{formatNumber(clip.views)} views</span>
                <span>{clip.size}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  {clip.category} • {clip.tag}
                </span>
                <span>{clip.date}</span>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <Eye className="h-4 w-4 text-gray-500" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <Share2 className="h-4 w-4 text-gray-500" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <Star className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
