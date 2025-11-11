import type React from "react";
import { DashboardTop } from "../../components/ui/Dashboard/DashboardTop";
import { JobSection } from "../../components/ui/Dashboard/JobsSection";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { Job } from "../../hooks/jobs/jobs";
import type { Clips } from "../../hooks/jobs/clips";

export const Dashboard: React.FC<{
  isMobile: boolean;
  jobs: any[];
  clips: Clips[];
  clipsRefetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Clips[], Error>>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Job[], Error>>;
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
  clips,
  clipsRefetch,
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
  return (
    <>
      <DashboardTop jobs={jobs} clips={clips} />
      <JobSection
        isMobile={isMobile}
        jobs={jobs}
        refetch={refetch}
        clipsRefetch={clipsRefetch}
        clips={clips}
        activeTab={activeTab}
        unfinishedJobs={unfinishedJobs}
        setActiveTab={setActiveTab}
        setUnfinishedJobs={setUnfinishedJobs}
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
    </>
  );
};
