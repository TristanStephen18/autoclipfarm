import type { Clips } from "../hooks/jobs/clips";

export type JobStatus =
  | "ready"
  | "processing"
  | "queued"
  | "completed"
  | "failed";

export type JobCardProps = {
  id: string;
  status: JobStatus;
  time: string;
  title: string;
  videoInfo: string;
  variations: string;
  progress?: number;
  clipsPerVideo?: number;
  refetchJobs: () => void;
  clips: Clips[];
};