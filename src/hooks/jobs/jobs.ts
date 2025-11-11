import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { backendPrefix } from "../../confg";

export interface Job {
  id: string;
  title: string;
  youtubeUrl: string | null;
  videoUrl: string;
  aiInstructions: string;
  clipLengthMin: number;
  clipLengthMax: number;
  contentRights: boolean;
  clipsPerVideo: string | number;
  variationsPerClip: number;
  progress: number;
  status: string;
  createdAt: string;
  clipsGenerated: number;
  videoCount: number;
}

export const useJobs = () => {
  const query = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetch(`${backendPrefix}/api/jobs`, {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("autocliptoken") || ""
          }`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data = await res.json();
      return (data as Job[]) || [];
    },
    initialData: [],
  });

  useEffect(() => {
    if (query.isSuccess) {
      console.log("Jobs fetched successfully\n", "Jobs:", query.data);
    }
    if (query.isError) {
      console.error(query.error);
    }
  }, [query.isSuccess, query.isError]);

  return query;
};
