import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { backendPrefix } from "../../confg";

export interface Clips {
  clipId: number;
  jobId: string;
  clipUrl: string;
  description: string;
  duration: number;
  favourite: boolean;
  createdAt: Date;
}

export const useClips = () => {
  const query = useQuery<Clips[]>({
    queryKey: ["clips"],
    queryFn: async () => {
      const res = await fetch(`${backendPrefix}/api/clips`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("autocliptoken") || ""}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch clips");

      const data = await res.json();
      return data as Clips[] | [];
    },
    initialData:[]
  });

  useEffect(()=>{
    if(query.isSuccess){
        console.log("fetched clips: ", query.data)
    }
    if(query.isError){
        console.error('Failed to fetched user clips');
    }
  },[query.isSuccess, query.isError])

  return query;
};
