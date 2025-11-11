import React from "react";
import { MdVideocam } from "react-icons/md";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100 flex flex-col relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-[200px] right-[-150px] w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-120px] left-[150px] w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 backdrop-blur-sm bg-black/40">
        <div className="max-w-6xl mx-auto px-5 py-6 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-md">
              <MdVideocam className="text-white text-2xl" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-white">AutoClip Farm</h1>
              <p className="text-xs text-gray-300 tracking-wide">
                AI Video Clip Generator
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 relative z-10 animate-fadeIn">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6 text-center">
            Privacy Policy
          </h2>

          <p className="mb-6 text-gray-300 text-center leading-relaxed">
            At{" "}
            <span className="font-semibold text-purple-400">AutoClip Farm</span>,
            we value your privacy. This Privacy Policy explains how we collect,
            use, and protect your information when you use our AI video
            generation services.
          </p>

          <section className="space-y-8 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                1. Information We Collect
              </h3>
              <p>
                We collect information to provide and improve our service. This
                includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <span className="font-medium text-gray-200">
                    Account Information:
                  </span>{" "}
                  such as your name, email, and login credentials.
                </li>
                <li>
                  <span className="font-medium text-gray-200">
                    Uploaded Media:
                  </span>{" "}
                  video files and metadata necessary for AI processing.
                </li>
                <li>
                  <span className="font-medium text-gray-200">
                    Usage Data:
                  </span>{" "}
                  including browser type, access times, and pages visited to
                  improve app performance.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                2. How We Use Your Information
              </h3>
              <p>
                AutoClip Farm uses the collected data for the following
                purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>To process and generate clips from your uploaded videos.</li>
                <li>To improve our AI models and enhance performance.</li>
                <li>To respond to support requests or inquiries.</li>
                <li>
                  To send service updates, only when you have opted to receive
                  them.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                3. Data Security
              </h3>
              <p>
                We implement industry-standard security measures to protect your
                data from unauthorized access or misuse. However, no system is
                entirely immune to risks, and by using the service, you accept
                that there is some inherent risk involved in data transmission.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                4. Data Retention
              </h3>
              <p>
                Uploaded videos and generated clips are retained temporarily to
                complete AI processing. You can delete your data anytime by
                contacting support or through account settings (if available).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                5. Third-Party Services
              </h3>
              <p>
                We may use trusted third-party services (like cloud storage or
                analytics tools) that comply with privacy standards. These
                services only process data required to perform their functions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                6. Your Rights
              </h3>
              <p>
                You have the right to access, modify, or delete your personal
                information. You may also withdraw consent for processing your
                data at any time.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                7. Changes to This Policy
              </h3>
              <p>
                We may revise this Privacy Policy occasionally. Any updates will
                be reflected on this page. Continued use of the platform after
                updates signifies your acceptance of the revised policy.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                8. Contact Us
              </h3>
              <p>
                For privacy inquiries or data requests, please contact us at{" "}
                <a
                  href="mailto:support@autoclipfarm.ai"
                  className="text-pink-400 underline hover:text-pink-500"
                >
                  support@autoclipfarm.ai
                </a>
                .
              </p>
            </div>
          </section>

          <footer className="mt-12 border-t border-white/10 pt-6 text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} AutoClip Farm. All rights reserved.
          </footer>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
