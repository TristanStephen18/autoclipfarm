import type { JobStatus } from "./jobcard";

export const statusOrder: Record<JobStatus, number> = {
  processing: 1,
  ready: 2,
  queued: 3,
  completed: 4,
  failed: 5,
};
