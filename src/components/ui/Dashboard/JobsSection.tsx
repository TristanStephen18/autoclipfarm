import React, { useEffect } from "react";
import {
  type QueryObserverResult,
  type RefetchOptions,
} from "@tanstack/react-query";
import type { Job } from "../../../hooks/jobs/jobs";
import type { Clips } from "../../../hooks/jobs/clips";
import GettingReadyModal from "./UnfinishedJobs";
import { CreateJobPanel } from "./CreateJobPanel";
import { ActiveJobsPanel } from "./ActiveJobs";
import { RecentClipsPanel } from "./RecentClips";

export const JobSection: React.FC<{
  isMobile: boolean;
  jobs: any[];
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Job[], Error>>;
  clipsRefetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Clips[], Error>>;
  clips: Clips[];
  activeTab: "jobs" | "create";
  setActiveTab: React.Dispatch<React.SetStateAction<"jobs" | "create">>;
  unfinishedJobs: any[];
  setUnfinishedJobs: React.Dispatch<React.SetStateAction<any[]>>;
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
  isMobile,
  jobs,
  refetch,
  clipsRefetch,
  clips,
  activeTab,
  setActiveTab,
  unfinishedJobs,
  setUnfinishedJobs,
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
  useEffect(() => {
    const stillProcessing = jobs.filter(
      (job) => job.status === "processing" || job.status === "queued"
    );
    if (stillProcessing.length > 0 && unfinishedJobs.length === 0) {
      setUnfinishedJobs(stillProcessing);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      clipsRefetch();
    }, 2000);
    return () => clearInterval(interval);
  }, [clipsRefetch]);

  const closePrompt = () => setUnfinishedJobs([]);

  if (isMobile) {
    return (
      <div className="mt-6">
        <div className="flex mb-4 border-b">
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "create"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500"
            }`}
          >
            Create Job
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "jobs"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500"
            }`}
          >
            Active Jobs
          </button>
        </div>

        {activeTab === "create" ? (
          <CreateJobPanel
            refetch={refetch}
            youtubeUrl={youtubeUrl}
            setYoutubeUrl={setYoutubeUrl}
            videoFile={videoFile}
            setVideoFile={setVideoFile}
            uploadedVideo={uploadedVideo}
            setUploadedVideo={setUploadedVideo}
            uploading={uploading}
            setUploading={setUploading}
            contentRights={contentRights}
            setContentRights={setContentRights}
            clipLengthMin={clipLengthMin}
            setClipLengthMin={setClipLengthMin}
            clipLengthMax={clipLengthMax}
            setClipLengthMax={setClipLengthMax}
            clipsPerVideo={clipsPerVideo}
            setClipsPerVideo={setClipsPerVideo}
            variationsPerClip={variationsPerClip}
            setVariationsPerClip={setVariationsPerClip}
            aiInstructions={aiInstructions}
            setAiInstructions={setAiInstructions}
          />
        ) : (
          <ActiveJobsPanel
            sortedJobs={jobs}
            refetch={refetch}
            clips={clips}
          />
        )}
        <RecentClipsPanel clips={clips} jobs={jobs} />
        {unfinishedJobs.length > 0 && (
          <GettingReadyModal
            jobs={unfinishedJobs}
            onComplete={closePrompt}
            refetchJobs={refetch}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <CreateJobPanel
          refetch={refetch}
          youtubeUrl={youtubeUrl}
          setYoutubeUrl={setYoutubeUrl}
          videoFile={videoFile}
          setVideoFile={setVideoFile}
          uploadedVideo={uploadedVideo}
          setUploadedVideo={setUploadedVideo}
          uploading={uploading}
          setUploading={setUploading}
          contentRights={contentRights}
          setContentRights={setContentRights}
          clipLengthMin={clipLengthMin}
          setClipLengthMin={setClipLengthMin}
          clipLengthMax={clipLengthMax}
          setClipLengthMax={setClipLengthMax}
          clipsPerVideo={clipsPerVideo}
          setClipsPerVideo={setClipsPerVideo}
          variationsPerClip={variationsPerClip}
          setVariationsPerClip={setVariationsPerClip}
          aiInstructions={aiInstructions}
          setAiInstructions={setAiInstructions}
        />

        <ActiveJobsPanel
          sortedJobs={jobs}
          refetch={refetch}
          clips={clips}
        />
      </div>
      <RecentClipsPanel clips={clips} jobs={jobs} />
      {unfinishedJobs.length > 0 && (
        <GettingReadyModal
          jobs={unfinishedJobs}
          onComplete={closePrompt}
          refetchJobs={refetch}
        />
      )}
    </div>
  );
};
