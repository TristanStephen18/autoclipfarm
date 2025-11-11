import type { Clips } from "../../hooks/jobs/clips";

export function successRateCalcu(jobs: any[], clips: Clips[]) {
  let jobs_total_clips = 0;

  //get total number of clips of completed jobs and failed
  jobs.map((job) => {
    if (job.status === "completed" || job.status === "failed")
      jobs_total_clips +=
        (Number(job.variationsPerClip) * Number(job.clipsPerVideo));
  });

  const totalgenerated_clips = clips.length;

  //computation for success rate
  const successrate = Math.round((jobs_total_clips / totalgenerated_clips) * 100);

  return successrate || 0;
}
