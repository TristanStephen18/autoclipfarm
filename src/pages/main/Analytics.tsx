import {
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Film,
  CheckCircle,
  Clock,
  AlertCircle,
  Facebook,
  Instagram,
  Video,
  ExternalLink,
  Play,
} from "lucide-react";

const AnalyticsDashboard = () => {
  const stats = [
    {
      label: "Total Views",
      value: "1.2M",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Likes",
      value: "84.3K",
      change: "+8.3%",
      trend: "up",
      icon: Heart,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Total Comments",
      value: "12.4K",
      change: "+15.2%",
      trend: "up",
      icon: MessageCircle,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Shares",
      value: "6.8K",
      change: "-2.1%",
      trend: "down",
      icon: Share2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  const jobStats = [
    {
      label: "Clips Generated",
      value: "248",
      icon: Film,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Jobs Completed",
      value: "156",
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Jobs In Progress",
      value: "12",
      icon: Clock,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Jobs Failed",
      value: "3",
      icon: AlertCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  const platformData = [
    {
      name: "TikTok",
      views: "680K",
      likes: "45.2K",
      comments: "8.1K",
      shares: "4.2K",
      icon: Video,
    },
    {
      name: "Instagram",
      views: "380K",
      likes: "28.4K",
      comments: "3.2K",
      shares: "2.1K",
      icon: Instagram,
    },
    {
      name: "Facebook",
      views: "140K",
      likes: "10.7K",
      comments: "1.1K",
      shares: "500",
      icon: Facebook,
    },
  ];

  const topPosts = [
    {
      id: 1,
      title: "Epic Gaming Moment #42",
      platform: "TikTok",
      views: "45.2K",
      likes: "3.2K",
      comments: "890",
      shares: "234",
      thumbnail:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
      postedDate: "2 hours ago",
    },
    {
      id: 2,
      title: "Stand Up Comedy Gold",
      platform: "Instagram",
      views: "32.1K",
      likes: "2.8K",
      comments: "567",
      shares: "189",
      thumbnail:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop",
      postedDate: "5 hours ago",
    },
    {
      id: 3,
      title: "Funny Reaction Compilation",
      platform: "Facebook",
      views: "18.5K",
      likes: "1.4K",
      comments: "312",
      shares: "98",
      thumbnail:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop",
      postedDate: "1 day ago",
    },
    {
      id: 4,
      title: "Best Moments of the Week",
      platform: "TikTok",
      views: "28.9K",
      likes: "2.1K",
      comments: "445",
      shares: "167",
      thumbnail:
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=600&fit=crop",
      postedDate: "1 day ago",
    },
    {
      id: 5,
      title: "Epic Gaming Moment #42",
      platform: "TikTok",
      views: "45.2K",
      likes: "3.2K",
      comments: "890",
      shares: "234",
      thumbnail:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
      postedDate: "2 hours ago",
    },
    {
      id: 6,
      title: "Stand Up Comedy Gold",
      platform: "Instagram",
      views: "32.1K",
      likes: "2.8K",
      comments: "567",
      shares: "189",
      thumbnail:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop",
      postedDate: "5 hours ago",
    },
    {
      id: 7,
      title: "Funny Reaction Compilation",
      platform: "Facebook",
      views: "18.5K",
      likes: "1.4K",
      comments: "312",
      shares: "98",
      thumbnail:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop",
      postedDate: "1 day ago",
    },
    {
      id: 8,
      title: "Epic Gaming Moment #42",
      platform: "TikTok",
      views: "45.2K",
      likes: "3.2K",
      comments: "890",
      shares: "234",
      thumbnail:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
      postedDate: "2 hours ago",
    },
    {
      id: 9,
      title: "Stand Up Comedy Gold",
      platform: "Instagram",
      views: "32.1K",
      likes: "2.8K",
      comments: "567",
      shares: "189",
      thumbnail:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop",
      postedDate: "5 hours ago",
    },
    {
      id: 10,
      title: "Funny Reaction Compilation",
      platform: "Facebook",
      views: "18.5K",
      likes: "1.4K",
      comments: "312",
      shares: "98",
      thumbnail:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop",
      postedDate: "1 day ago",
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="px-2 py-1 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Analytics
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Track your AutoClip Farm usage and clip's performance
            </p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Engagement Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div
                    className={`flex items-center text-sm font-semibold ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Job Statistics */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Job Statistics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl ${stat.iconBg} flex-shrink-0`}
                  >
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform Performance */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Platform Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platformData.map((platform, idx) => {
              const Icon = platform.icon;
              return (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">
                      {platform.name}
                    </h3>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Views</span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {platform.views}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Likes</span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {platform.likes}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Comments</span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {platform.comments}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Shares</span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {platform.shares}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performing Posts */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Top Performing Posts
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {topPosts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Video Preview */}
                <div className="relative bg-gray-900 aspect-[9/16] group cursor-pointer">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Play
                        className="w-6 h-6 text-gray-900 ml-0.5"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-purple-600 text-white">
                      {post.platform}
                    </span>
                  </div>
                </div>

                {/* Post Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Engagement Stats */}
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-blue-600" />
                        <span className="text-gray-600">Views</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {post.views}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-green-600" />
                        <span className="text-gray-600">Likes</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {post.likes}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 text-blue-600" />
                        <span className="text-gray-600">Comments</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {post.comments}
                      </span>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-xs transition-colors">
                    <ExternalLink className="w-3 h-3" />
                    View Post
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
