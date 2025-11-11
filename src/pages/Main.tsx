import type React from "react";
import { useState } from "react";
import { useAuthHooks } from "../hooks/Auth";
import { Sidebar } from "../components/ui/Sidebar";
import { Dashboard } from "./main/Dashboard";
import { useJobs } from "../hooks/jobs/jobs";
import { useClips } from "../hooks/jobs/clips";
import { statusOrder } from "../types/jobs";
import { useJobsStates } from "../hooks/jobs/jobhooks";
import { useActiveJobsHooks } from "../hooks/jobs/acivejobshooks";
import type { JobStatus } from "../types/jobcard";
import { ClipsLibrary } from "./main/MyClips";
import ProfilePage from "./main/Profile";
import { useProfile } from "../hooks/profile/profileData";
import type { Profile } from "../types/profile";
import AnalyticsDashboard from "./main/Analytics";

export const Main: React.FC = () => {
  const { viewportChecker, isMobile } = useAuthHooks();
  const { activeTab, setActiveTab, unfinishedJobs, setUnfinishedJobs } =
    useJobsStates();
  const {
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
  } = useActiveJobsHooks();

  const [activePage, setActivePage] = useState("Dashboard");
  const { data: profile} = useProfile();


  const {
    data: jobs,
    isLoading: jobsIsLoading,
    isError: jobsIsError,
    refetch: jobsRefetch,
  } = useJobs();
  const {
    data: clips,
    isLoading: clipsIsLoading,
    isError: clipsIsError,
    refetch: clipsRefetch,
  } = useClips();

  if (jobsIsLoading) {
    console.log("fetching jobs");
  }
  if (jobsIsError) {
    console.error("error fetching jobs");
  }

  if (clipsIsLoading) {
    console.log("fetching clips");
  }
  if (clipsIsError) {
    console.error("error fetching clips");
  }

  const sortedJobs = jobs.sort(
    (a, b) =>
      statusOrder[a.status as JobStatus] - statusOrder[b.status as JobStatus]
  );

  viewportChecker();

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <Dashboard
            isMobile={isMobile}
            jobs={sortedJobs as any[]}
            refetch={jobsRefetch}
            clips={clips}
            clipsRefetch={clipsRefetch}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            unfinishedJobs={unfinishedJobs}
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
        );

      case "Library":
        return <ClipsLibrary clips={clips} jobs={jobs} profile={(Array.isArray(profile) ? profile[0] : profile) as Profile} refetchJobs={jobsRefetch}/>;

      case "Analytics":
        return <AnalyticsDashboard/>;

      case "Settings":
        return <ProfilePage profile={(Array.isArray(profile) ? profile[0] : profile) as Profile} clips={clips} jobs={jobs}/>

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};
