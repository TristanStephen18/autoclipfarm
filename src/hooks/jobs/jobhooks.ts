import { useState } from "react";

export function useJobsStates ()  {
      const [activeTab, setActiveTab] = useState<"create" | "jobs">("create");
    
      const [unfinishedJobs, setUnfinishedJobs] = useState<any[]>([]);


      return {
        activeTab,
        setActiveTab,
        unfinishedJobs,
        setUnfinishedJobs
      }
}