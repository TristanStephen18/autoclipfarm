// src/pages/ProfilePage.tsx
import React from "react";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaSignOutAlt,
} from "react-icons/fa";
import type { Profile } from "../../types/profile";
import type { Job } from "../../hooks/jobs/jobs";
import type { Clips } from "../../hooks/jobs/clips";
import { formatTimestamp } from "../../lib/utils/TimeStampFormatter";

const ProfilePage: React.FC<{
  profile: Profile;
  jobs: Job[];
  clips: Clips[];
}> = ({ profile, jobs, clips }) => {
  const connections = [
    {
      name: "Instagram",
      handle: "Not Connected",
      connected: profile.instagramConnection,
      icon: <FaInstagram className="text-pink-500 text-2xl" />,
    },
    {
      name: "TikTok",
      handle: "Not Connected",
      connected: profile.tiktokConnection,
      icon: <FaTiktok className="text-gray-400 text-2xl" />,
    },
    {
      name: "Facebook",
      handle: "Not Connected",
      connected: profile.facebookConnection,
      icon: <FaFacebook className="text-gray-400 text-2xl" />,
    },
  ];

  return (
    <div className="min-h-screen text-gray-800 px-2 sm:px-6 md:px-13 py-4 font-inter">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={profile.profilePicture}
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
              />
              <span className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
            </div>

            <div>
              <h1 className="text-3xl font-semibold text-gray-800">
                {profile.name}
              </h1>
              <p className="text-sm text-gray-500">
                AI Video Creator • Joined {formatTimestamp(new Date(profile.createdAt))}
              </p>
            </div>
          </div>

          <button
            className="flex items-center gap-2 mt-6 sm:mt-0 text-gray-600 hover:bg-red-50 hover:text-red-500 border border-gray-200 px-4 py-2 rounded-md transition"
            onClick={() => {
              localStorage.removeItem("autocliptoken");
              window.location.href = "/";
            }}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Total Jobs", value: jobs.length, color: "blue" },
            { label: "Total Clips", value: clips.length, color: "green" },
            { label: "Followers", value: "0", color: "blue" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-sm text-gray-500 mb-2">{stat.label}</h3>
              <p
                className={`text-3xl font-bold ${
                  stat.color === "blue" ? "text-blue-600" : "text-green-600"
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Social Connections */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Connected Social Accounts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {connections.map((account, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between rounded-lg p-4 border transition ${
                  account.connected
                    ? "bg-green-50 border-green-200 hover:border-green-300"
                    : "bg-gray-50 border-gray-200 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  {account.icon}
                  <div>
                    <p
                      className={`font-medium ${
                        account.connected ? "text-gray-800" : "text-gray-500"
                      }`}
                    >
                      {account.name}
                    </p>
                    <p className="text-xs text-gray-500">{account.handle}</p>
                  </div>
                </div>
                {account.connected ? (
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Manage
                  </button>
                ) : (
                  <button className="text-sm text-gray-400 hover:text-blue-600 font-medium">
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Jobs Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Clip Generation Jobs
          </h2>

          {jobs.length === 0 ? (
            <p className="text-sm text-gray-500">
              No jobs yet. Start creating clips!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, 3)
                .map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    {/* Video Preview */}
                    <div className="relative w-full aspect-video bg-gray-100">
                      <video
                        src={job.videoUrl}
                        controls={false}
                        muted
                        className="w-full h-full object-cover"
                      />
                      {job.status === "processing" && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-medium">
                          Processing...
                        </div>
                      )}
                    </div>

                    {/* Job Details */}
                    <div className="p-4 space-y-2">
                      <h3 className="text-gray-800 font-semibold text-base truncate">
                        {job.title || "Untitled Job"}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <p>{job.clipsGenerated} clips generated</p>
                        <p>
                          {new Date(job.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            job.status === "completed"
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                          style={{ width: `${job.progress || 0}%` }}
                        />
                      </div>

                      <p
                        className={`text-xs font-medium mt-1 ${
                          job.status === "completed"
                            ? "text-green-600"
                            : job.status === "processing"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {job.status === "completed"
                          ? "Completed"
                          : job.status === "processing"
                          ? "Processing"
                          : "Pending"}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
