export function getActiveJobs(jobs: any[]) {
  let active = 0;
  jobs.map((job) => {
    if (job.status === "processing") active++;
  });

  return active;
}
