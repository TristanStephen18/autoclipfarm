import { useEffect } from "react";
import { useLocation } from "wouter";
import toast from "react-hot-toast";
import { MdVideocam } from "react-icons/md";
import { useGoogleLoginHook } from "../../hooks/form/GoogleLogin";

const GoogleLoading = () => {
  const { googleLogin } = useGoogleLoginHook();
  const [, navigate] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    if (email) {
      googleLogin(email);
    } else {
      toast.error("No email found from Google login");
      navigate("/auth");
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#fff8f3] to-[#ffe8e0] overflow-hidden px-6 text-center">
      {/* Background floating blobs for depth */}
      <div className="absolute w-[250px] h-[250px] bg-blue-200 rounded-full blur-3xl opacity-40 top-10 left-10 animate-float-slow"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-200 rounded-full blur-3xl opacity-40 bottom-10 right-10 animate-float-slower"></div>

      {/* Brand Logo Section */}
      <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
        <div className="bg-blue-500 p-3 rounded-lg shadow-lg animate-pulse-soft">
          <MdVideocam className="text-white text-2xl sm:text-3xl" />
        </div>
        <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
          AutoClip Farm
        </span>
      </div>

      {/* Animated loader ring */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-6 animate-fade-in-up delay-150">
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-smooth"></div>
        <div className="absolute inset-1 border-4 border-blue-300 border-t-transparent rounded-full animate-spin-slow"></div>
      </div>

      {/* Text below loader */}
      <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg animate-fade-in-up delay-300">
        Setting up your account...
      </p>

      {/* Optional tiny tagline */}
      <p className="mt-2 text-gray-500 text-xs sm:text-sm animate-fade-in-up delay-500">
        Please wait while we finalize your login ✨
      </p>

      {/* Custom animations */}
      <style>
        {`
          @keyframes spin-smooth {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes spin-slow {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }

          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }

          @keyframes float-slower {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(20px); }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
          }

          .animate-pulse-soft {
            animation: pulse 2s ease-in-out infinite;
          }

          .animate-spin-smooth {
            animation: spin-smooth 1s linear infinite;
          }

          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }

          .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
          }

          .animate-float-slower {
            animation: float-slower 9s ease-in-out infinite;
          }

          .delay-150 { animation-delay: 150ms; }
          .delay-300 { animation-delay: 300ms; }
          .delay-500 { animation-delay: 500ms; }
        `}
      </style>
    </div>
  );
};

export default GoogleLoading;
