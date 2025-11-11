import React from "react";
import { MdVideocam } from "react-icons/md";

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100 flex flex-col relative overflow-hidden">
      {/* Animated gradient blobs for background depth */}
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

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 relative z-10 animate-fadeIn">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6 text-center">
            Terms of Service
          </h2>

          <p className="mb-6 text-gray-300 text-center leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-purple-400">AutoClip Farm</span>,
            the AI-powered video clipping tool designed to automate your clip
            creation process. By using our service, you agree to the terms below.
          </p>

          <section className="space-y-8 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                1. Acceptance of Terms
              </h3>
              <p>
                By using AutoClip Farm, you acknowledge that you have read,
                understood, and agreed to these Terms of Service. If you do not
                agree, please discontinue use.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                2. Description of Service
              </h3>
              <p>
                AutoClip Farm offers AI-assisted video clipping, highlights, and
                key moment extraction. While we strive for precision, occasional
                inaccuracies or downtime may occur.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                3. Content Rights
              </h3>
              <p>
                You retain full ownership of the videos you upload. By uploading
                content, you confirm you have permission to use it. AutoClip Farm
                bears no responsibility for unauthorized use of copyrighted
                material.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                4. AI-Generated Content
              </h3>
              <p>
                Our AI may produce content that is imperfect or unexpected. You
                are responsible for reviewing generated clips before sharing or
                publishing them.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                5. Prohibited Use
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Do not upload illegal, violent, or harmful material.</li>
                <li>Do not attempt to reverse-engineer or exploit the platform.</li>
                <li>
                  Do not use AutoClip Farm for spamming or malicious activities.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                6. Limitation of Liability
              </h3>
              <p>
                AutoClip Farm shall not be liable for any damages arising from
                use of this platform, whether direct, indirect, incidental, or
                consequential.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                7. Modifications to Terms
              </h3>
              <p>
                We may update these Terms periodically. Updates will appear on
                this page. Continued use of the platform signifies your acceptance
                of any changes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                8. Contact Information
              </h3>
              <p>
                For questions or feedback, reach us at{" "}
                <a
                  href="mailto:support@autoclipfarm.ai"
                  className="text-pink-400 underline hover:text-pink-500"
                >
                  support@autoclipfarm.ai
                </a>.
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

export default TermsOfService;
