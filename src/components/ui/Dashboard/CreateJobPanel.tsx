import {
  useMutation,
  useQueryClient,
  type QueryObserverResult,
  type RefetchOptions,
} from "@tanstack/react-query";
import React from "react";
import type { Job } from "../../../hooks/jobs/jobs";
import axios from "axios";
import { backendPrefix } from "../../../confg";
import toast from "react-hot-toast";
import { Clock, Play, Settings, Upload } from "lucide-react";

export const CreateJobPanel: React.FC<{
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Job[], Error>>;
  youtubeUrl: string;
  setYoutubeUrl: React.Dispatch<React.SetStateAction<string>>;
  videoFile: File | null;
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploadedVideo: {
    url: string;
    title?: string | undefined;
  } | null;
  setUploadedVideo: React.Dispatch<
    React.SetStateAction<{
      url: string;
      title?: string;
    } | null>
  >;
  aiInstructions: string;
  setAiInstructions: React.Dispatch<React.SetStateAction<string>>;
  contentRights: boolean;
  setContentRights: React.Dispatch<React.SetStateAction<boolean>>;
  uploading: boolean;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  clipLengthMin: number;
  setClipLengthMin: React.Dispatch<React.SetStateAction<number>>;
  clipLengthMax: number;
  setClipLengthMax: React.Dispatch<React.SetStateAction<number>>;
  clipsPerVideo: number;
  setClipsPerVideo: React.Dispatch<React.SetStateAction<number>>;
  variationsPerClip: number;
  setVariationsPerClip: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  refetch,
  youtubeUrl,
  setYoutubeUrl,
  videoFile,
  setVideoFile,
  uploadedVideo,
  setUploadedVideo,
  aiInstructions,
  setAiInstructions,
  contentRights,
  setContentRights,
  uploading,
  setUploading,
  clipLengthMin,
  setClipLengthMin,
  clipLengthMax,
  setClipLengthMax,
  clipsPerVideo,
  setClipsPerVideo,
  variationsPerClip,
  setVariationsPerClip,
}) => {
  const queryClient = useQueryClient();

  const createJob = useMutation({
    mutationFn: async (newJob: Partial<Job>) => {
      const token = localStorage.getItem("autocliptoken");
      const res = await axios.post(`${backendPrefix}/api/jobs`, newJob, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job created successfully!");
      refetch();
    },
    onError: (error: any) => {
      console.error("❌ Error creating job:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Failed to create job");
      } else {
        toast.error("Something went wrong.");
      }
    },
  });

  const handleAdd = async () => {
    try {
      setUploading(true);
      let result;

      if (youtubeUrl.trim()) {
        const res = await axios.post(
          `${backendPrefix}/api/yt/convert`,
          { url: youtubeUrl },
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("autocliptoken") || ""
              }`,
            },
          }
        );
        result = res.data;
        setUploadedVideo({
          url: result.supabaseUrl,
          title: result.title,
        });
        setClipLengthMax(result.duration);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("❌ Failed to add video: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleCreateJob = async () => {
    const loadingToastId = toast.loading("Creating job...");

    try {
      if (!uploadedVideo) return toast.error("Please add a video first.");
      if (!contentRights) {
        toast.dismiss(loadingToastId);
        return toast.error("You must confirm content rights.");
      }

      if (!aiInstructions) {
        toast.dismiss(loadingToastId);
        return toast.error("You must add AI instructions");
      }

      await createJob.mutateAsync({
        title: uploadedVideo.title || "AI Clip Job",
        aiInstructions,
        youtubeUrl: youtubeUrl || null,
        videoUrl: uploadedVideo.url,
        contentRights,
        status: "ready",
        progress: 0,
        clipLengthMin,
        clipLengthMax,
        clipsPerVideo,
        variationsPerClip,
      });

      setYoutubeUrl("");
      setVideoFile(null);
      setUploadedVideo(null);
      setAiInstructions("");
      setContentRights(false);
      toast.dismiss(loadingToastId);
    } catch (err: any) {
      toast.dismiss(loadingToastId);
      console.error(err);
      alert("❌ Failed to create job: " + err.message);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setVideoFile(file);
    const loadingToastId = toast.loading("Uploading video...");

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("video", file);

      const uploadRes = await axios.post(
        `${backendPrefix}/api/upload/upload-video`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("autocliptoken") || ""
            }`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload response:", uploadRes.data);
      const uploaded = uploadRes.data.file;

      const result = {
        url: uploaded.url,
        title: uploaded.originalName || uploaded.name || "Uploaded video",
      };

      setClipLengthMax(uploaded.duration);
      setUploadedVideo(result);
      console.log(videoFile);

      toast.dismiss(loadingToastId); // remove loading
      toast.success("Video uploaded successfully!");
    } catch (err: any) {
      console.error(err);
      toast.dismiss(loadingToastId);
      toast.error("❌ Failed to upload video: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
      <h2 className="text-xl font-semibold text-gray-800">
        Create New Clip Generation Job
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Video Sources
          </label>
          <div className="flex mb-3 max-w-md">
            <input
              type="text"
              placeholder="Paste YouTube URL"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button
              onClick={handleAdd}
              disabled={uploading || !youtubeUrl.trim()}
              className="bg-purple-600 text-white px-5 rounded-r-md text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
            >
              {uploading ? "Adding..." : "Add"}
            </button>
          </div>

          <div className="relative">
            {!uploadedVideo ? (
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition block">
                <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                Upload MP4/MOV files
                <p className="text-xs text-gray-400 mt-1">
                  Drag & drop or click to browse
                </p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                <video
                  controls
                  src={uploadedVideo.url}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 flex justify-between items-center">
                  <span className="truncate">
                    {uploadedVideo.title || "Uploaded video"}
                  </span>
                  <button
                    onClick={() => setUploadedVideo(null)}
                    className="text-red-300 hover:text-red-500 font-medium text-[11px]"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-start gap-2 text-xs text-gray-600 border rounded-md p-3 bg-yellow-50 border-yellow-200 mt-5 leading-snug">
            <input
              type="checkbox"
              checked={contentRights}
              onChange={(e) => setContentRights(e.target.checked)}
              className="mt-0.5 accent-purple-600"
            />
            <span>
              <strong>Content Rights Confirmation</strong> — I confirm that I
              have the rights to reuse these videos for clip generation.
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            AI Instructions
          </label>
          <textarea
            value={aiInstructions}
            onChange={(e) => setAiInstructions(e.target.value)}
            placeholder={`What do you want from these videos? (e.g., "Find every tip about negotiating salary", "Extract the funniest moments", "Get all product demonstrations")`}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none min-h-[100px]"
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {[
              "Extract key insights",
              "Find funny moments",
              "Get best quotes",
              "Viral-worthy clips",
            ].map((tag) => (
              <span
                key={tag}
                onClick={() => setAiInstructions(tag)}
                className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700 cursor-pointer hover:bg-purple-100 hover:text-purple-700 transition"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-md p-3 text-xs text-green-800 leading-relaxed mt-5">
            <strong className="block text-sm mb-1">
              UNLIMITED AI EXTRACTION
            </strong>
            Our AI analyzes your entire video content and extracts ALL segments
            that match your instructions. No “clips per video” limit!
            <br />
            <br />
            1hr course: 50+ clips • 3hr interview: 200+ clips • 6hr conference:
            500+ clips
          </div>
        </div>
      </div>
      <div className="w-full">
        <h3 className="text-sm font-semibold text-purple-700 flex items-center gap-2 mb-4">
          <Settings size={16} className="text-purple-600" />
          Clip Generation Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Clip Length Range */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-2">
              Clip Length Range (seconds)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={5}
                max={30}
                value={clipLengthMin} // ✅ use state
                onChange={(e) => setClipLengthMin(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <span className="text-gray-500 text-sm">to</span>
              <input
                type="number"
                min={8}
                max={100}
                value={clipLengthMax} // ✅ use state
                onChange={(e) => setClipLengthMax(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-2">
              Clips per Video
            </label>
            <select
              value={clipsPerVideo}
              onChange={(e) => setClipsPerVideo(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            >
              {[5, 10, 20, 30].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-2">
              Variations per Clip
            </label>
            <select
              value={variationsPerClip}
              onChange={(e) => setVariationsPerClip(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            >
              {[1, 2, 3, 5].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "variation" : "variations"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center text-xs text-gray-500">
          <Clock size={14} className="mr-1" />
          Processing time: 2–5 minutes per video
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCreateJob}
            disabled={createJob.isPending || uploading}
            className="px-4 py-1 bg-purple-600 text-white rounded-md text-xs font-lg flex items-center gap-1 hover:bg-purple-700 transition disabled:opacity-50"
          >
            <Play size={14} />{" "}
            {createJob.isPending ? "Creating..." : "Create Job"}
          </button>
        </div>
      </div>
    </div>
  );
};
