// Header.tsx

import React, { useState } from "react";
import useUploadVideo from "../../hooks/video";
import { toast } from "sonner";

function Header() {
  const { uploadVideo, loading, progress } = useUploadVideo();
   const num =localStorage.getItem("user");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleVideoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = e.target.files?.[0];

      if (!file) {
        toast.error("Please select a video");
        return;
      }

      if (!file.type.startsWith("video/")) {
        toast.error("Invalid video file");
        return;
      }

      e.target.value = "";

      await uploadVideo(file);

      toast.success("Video uploaded successfully");
    } catch (error) {
      toast.error("Upload failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#145441]/80 backdrop-blur-xl">
      
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <h1 className="text-white text-xl font-bold tracking-wide">
            OWNMOR
          </h1>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#about"
            className="text-sm text-gray-300 hover:text-emerald-400 transition"
          >
            About
          </a>

          <a
            href="#videos"
            className="text-sm text-gray-300 hover:text-emerald-400 transition"
          >
            Register
          </a>

          <a
            href="#community"
            className="text-sm text-gray-300 hover:text-emerald-400 transition"
          >
            Community
          </a>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          
          {/* UPLOAD BUTTON */}
          <label
            htmlFor="videoUpload"
            className="hidden sm:flex cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-3 rounded-xl transition-all"
          >
            Upload Video
          </label>

          <input
            id="videoUpload"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />

          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5"
          >
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#145441]/95 backdrop-blur-xl">
          <div className="px-4 py-5 flex flex-col gap-5">
            
            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="text-gray-200 hover:text-emerald-400 transition"
            >
              About
            </a>

            <a
              href="#videos"
              onClick={() => setMenuOpen(false)}
              className="text-gray-200 hover:text-emerald-400 transition"
            >
              register
            </a>

            <a
              href="#community"
              onClick={() => setMenuOpen(false)}
              className="text-gray-200 hover:text-emerald-400 transition"
            >
              Community
            </a>

            {/* MOBILE UPLOAD */}
            {(num == "7054637769" || num== "9320121302") && <label
              htmlFor="videoUpload"
              className="cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-3 rounded-xl transition-all text-center"
            >
              Upload Video
            </label>}
          </div>
        </div>
      )}

      {/* PROGRESS */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-4">
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-sm text-gray-300 mt-2">
            Uploading {progress}%
          </p>
        </div>
      )}
    </header>
  );
}

export default Header;
