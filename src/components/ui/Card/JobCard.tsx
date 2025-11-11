import axios from "axios";
import { backendPrefix } from "../../../confg";
import toast from "react-hot-toast";
import { findProcessingTime } from "../../../lib/utils/TimeConverter";
import { deleteJob } from "../../../lib/utils/JobsDeleter";
import { Download, Play, X } from "lucide-react";
import { handleDownloadAll } from "../../../lib/utils/ZipDownload";
import type { JobCardProps } from "../../../types/jobcard";
import { statusStyles } from "../../../data/StatusStyles";
import { useState } from "react";

export const JobCard: React.FC<JobCardProps> = ({
  id,
  status,
  time,
  title,
  videoInfo,
  variations,
  progress,
  refetchJobs,
  clipsPerVideo,
  clips,
}) => {
  const [isStarting, setIsStarting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isReady = status === "ready";
  const isProcessing = status === "processing";
  const isCompleted = status === "completed";

  const handleStart = async () => {
    let timer = 0;
    const counter = setInterval(() => {
      console.log("Processing time: ", timer, "seconds");
      timer++;
    }, 1000);
    setShowConfirm(false);
    setIsStarting(true);
    try {
      const token = localStorage.getItem("autocliptoken");
      await axios.post(
        `${backendPrefix}/api/jobs/new/${id}/start`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Job finished!");
      refetchJobs();
    } catch (err: any) {
      console.error("❌ Failed to start job:", err);
      toast.error(
        "Failed to start job: " + (err.response?.data?.error || err.message)
      );
    } finally {
      clearInterval(counter);
      console.log(findProcessingTime(timer));
      setIsStarting(false);
      setShowConfirm(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deleteJob(id);
    if (response === "error") {
      toast.error("Failed to delete job");
    } else {
      toast.success("Job removed successfully!");
    }
    refetchJobs();
    setIsDeleting(false);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded-full capitalize font-medium ${statusStyles[status]}`}
            >
              {status}
            </span>
            <span>{time}</span>
          </div>

          <div className="flex items-center gap-2">
            {isReady && (
              <button
                onClick={() => setShowConfirm(true)}
                disabled={isStarting}
                className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-md hover:bg-purple-700 transition disabled:opacity-50"
              >
                <Play size={12} />
                {isStarting ? "Starting..." : "Start Now"}
              </button>
            )}

            {isCompleted && (
              <button
                onClick={() =>
                  handleDownloadAll({ title: videoInfo, id }, clips)
                }
                className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 transition"
              >
                <Download size={12} /> Download ZIP
              </button>
            )}

            {(status === "ready" || status === "failed") && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-gray-400 hover:text-red-600 transition"
                title="Delete job"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-900">{videoInfo}</p>
        <p className="text-xs text-gray-700">
          {variations} variations × {clipsPerVideo} clips per video ={" "}
          {Number(variations) * Number(clipsPerVideo)} expected output
        </p>

        {isProcessing && progress !== undefined && (
          <div className="pt-1">
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="h-2 bg-purple-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {progress}% complete{" "}
              <span className="text-gray-400">— updating live</span>
            </p>
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Start Job Confirmation
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Once this job starts, it{" "}
              <strong>cannot be paused or stopped</strong> until it finishes.
              Are you sure you want to continue?
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-1.5 text-xs font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleStart}
                disabled={isStarting}
                className="px-4 py-1.5 text-xs font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition disabled:opacity-50"
              >
                {isStarting ? "Starting..." : "Start Anyway"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🗑️ Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Remove Job?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Are you sure you want to <strong>delete</strong> this job? This
              action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-1.5 text-xs font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition disabled:opacity-50"
              >
                {isDeleting ? "Removing..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
