import React, { useEffect } from "react";
import axios from "axios";
import { backendPrefix } from "../../../confg";
// import { toast } from "react-hot-toast";

interface GettingReadyModalProps {
  jobs: any[];
  onComplete: () => void;
  refetchJobs: () => void;
}

const GettingReadyModal: React.FC<GettingReadyModalProps> = ({
  jobs,
  onComplete,
  refetchJobs,
}) => {
  useEffect(() => {
    const markFailedJobs = async () => {
      if (!jobs.length) return onComplete();

      try {
        await Promise.all(
          jobs.map((job) =>
            axios.put(
              `${backendPrefix}/api/jobs/${job.id}`,
              { status: job.status === "processing" ? 'failed' : "ready" },
              { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            )
          )
        );

        console.log("Unfinished jobs marked as failed.");
        await refetchJobs();
      } catch (err: any) {
        console.error("❌ Failed to update unfinished jobs:", err);
      } finally {
        onComplete();
      }
    };

    markFailedJobs();
  }, [jobs, onComplete, refetchJobs]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 flex flex-col items-center text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
        <h3 className="text-lg font-semibold text-gray-800">
          Getting you ready...
        </h3>
        <p className="text-sm text-gray-600">
          Cleaning up unfinished jobs and preparing your workspace.
        </p>
      </div>
    </div>
  );
};

export default GettingReadyModal;
