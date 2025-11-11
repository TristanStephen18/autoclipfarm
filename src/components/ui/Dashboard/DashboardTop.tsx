import React, { useEffect } from "react";
import { PlayCircle, Download, Clock, TrendingUp } from "lucide-react";
import { getActiveJobs } from "../../../lib/utils/ProcessIdentifierJobs";
import type { Clips } from "../../../hooks/jobs/clips";
import { successRateCalcu } from "../../../lib/utils/SuccessRateCalculator";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon }) => {
  return (
    <div className="flex-1 bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-semibold">{value}</h2>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
      <div className="text-purple-600 bg-purple-50 p-2 rounded-lg">{icon}</div>
    </div>
  );
};

export const DashboardTop: React.FC<{jobs: any[]; clips: Clips[]}> = ({jobs, clips}) => {

  let successrate = successRateCalcu(jobs, clips);

  const activeJobs = getActiveJobs(jobs);

  useEffect(()=>{
    successrate = successRateCalcu(jobs, clips);
  }, [clips])

  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Jobs"
            value={jobs.length}
            subtitle="Jobs created"
            icon={<PlayCircle size={24} />}
          />
          <StatCard
            title="Total Clips"
            value={clips.length}
            subtitle="Clips generated"
            icon={<Download size={24} />}
          />
          <StatCard
            title="Active Jobs"
            value={activeJobs}
            subtitle="Currently processing"
            icon={<Clock size={24} />}
          />
          <StatCard
            title="Success Rate"
            value={successrate + '%'}
            subtitle="Completion rate"
            icon={<TrendingUp size={24} />}
          />
        </div>
      </div>
    </div>
  );
};
