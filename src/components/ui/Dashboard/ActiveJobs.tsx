import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useState } from "react";
import type { Clips } from "../../../hooks/jobs/clips";
import type { Job } from "../../../hooks/jobs/jobs";
import { backendPrefix } from "../../../confg";
import axios from "axios";
import toast from "react-hot-toast";
import {  Play } from "lucide-react";
import { formatTimestamp } from "../../../lib/utils/TimeStampFormatter";
import { JobCard } from "../Card/JobCard";

export const ActiveJobsPanel: React.FC<{
  sortedJobs: any[];
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Job[], Error>>;
  clips: Clips[];
}> = ({ sortedJobs, refetch, clips}) => {
  const [isStartingAll, setIsStartingAll] = useState(false);
  const [showStartAllConfirm, setShowStartAllConfirm] = useState(false);

  const readyJobs = sortedJobs.filter((job) => job.status === "ready");

  const waitForJobCompletion = async (jobId: string) => {
    const token = localStorage.getItem("autocliptoken");
    let jobStatus = "processing";
    while (jobStatus === "processing" || jobStatus === "queued") {
      await new Promise((r) => setTimeout(r, 5000)); // check every 5s
      const res = await axios.get(`${backendPrefix}/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      jobStatus = res.data.status;
      console.log(`Job ${jobId} status:`, jobStatus);
      if (jobStatus === "failed") throw new Error("Job failed");
    }
    return jobStatus;
  };

  const handleStartAll = async () => {
    const readyJobs = sortedJobs.filter((job) => job.status === "ready");
    if (!readyJobs.length) return toast("No ready jobs to start!");

    setIsStartingAll(true);

    // Single loading toast (keep reference)
    const loaderId = toast.loading(`Queueing ${readyJobs.length} job(s)...`);
    const token = localStorage.getItem("autocliptoken");

    try {
      // --- 1. Queue all ready jobs
      for (const job of readyJobs) {
        await axios.put(
          `${backendPrefix}/api/jobs/${job.id}`,
          { status: "queued" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      toast.success(`${readyJobs.length} job(s) queued!`, { id: loaderId });
      await refetch();

      // --- 2. Sequential processing
      for (const job of readyJobs) {
        toast.loading(`Starting "${job.title}"...`, { id: loaderId });

        await axios.post(
          `${backendPrefix}/api/jobs/new/${job.id}/start`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        await refetch();
        await waitForJobCompletion(job.id);

        toast.success(`✅ Completed "${job.title}"`, { id: loaderId });
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (err) {
      console.error("❌ Queue/start error:", err);
      toast.error("Something went wrong while processing jobs.", {
        id: loaderId,
      });
    } finally {
      setIsStartingAll(false);
      toast.dismiss(loaderId);
      await refetch();
    }
  };

  return (
    <div className="p-5 space-y-4 h-[150vh] flex flex-col">
      <div className="flex items-center justify-between flex-shrink-0">
        <h1 className="text-lg font-semibold text-gray-900">Active Jobs</h1>
        <div className="flex gap-2">
          {readyJobs.length > 0 && (
            <button
              onClick={()=> setShowStartAllConfirm(true)}
              disabled={isStartingAll}
              className="px-3 py-1 border border-green-600 bg-green-600 text-white rounded-md text-xs font-medium hover:bg-green-700 flex items-center gap-1 disabled:opacity-50"
            >
              <Play size={12} />
              {isStartingAll ? "Starting..." : "Start All"}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {sortedJobs.length > 0 ? (
          <div className="space-y-3">
            {sortedJobs.map((job) => (
              <JobCard
                key={job.id}
                status={job.status}
                time={formatTimestamp(new Date(job.createdAt))}
                title={job.aiInstructions}
                videoInfo={job.title}
                variations={job.variationsPerClip}
                id={job.id}
                refetchJobs={refetch}
                progress={job.progress}
                clipsPerVideo={job.clipsPerVideo}
                clips={clips}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No active jobs found.</p>
        )}
      </div>

       {showStartAllConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Confirm Start All
            </h2>
            <p className="text-sm text-gray-700 mb-5">
              When the process starts there will be <b>no means of cancelling</b> it.  
              Do you still want to continue?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowStartAllConfirm(false)}
                className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setShowStartAllConfirm(false);
                  await handleStartAll();
                }}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Yes, Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
