// Logo.tsx

import React from "react";
import healthBg from "../../../media/healthBg.jpg";

function Logo() {
  return (
    <div
      className="
        hidden
        lg:flex
        relative
        overflow-hidden
        flex-col
        justify-between
        min-h-full
        p-12
        border-r
        border-white/10
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: `url(${healthBg})`,
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col justify-center h-full">
        
        {/* TOP */}
        <div>
          <h1 className="text-4xl plaster-regular font-extrabold tracking-wide text-white">
            OWNMOR
          </h1>
        </div>

        {/* CENTER CONTENT */}
        <div className="space-y-8">
          
          <div>
            <h2 className="text-5xl felipa-regular leading-tight font-bold text-white">
              Join the{" "}
              <span className="text-emerald-400">
                Next Generation
              </span>
            </h2>
          </div>

          {/* DESCRIPTION LABEL */}
          <div
            className="
              inline-block
              bg-white/10
              border
              border-white/10
              backdrop-blur-xl
              rounded-2xl
              px-6
              py-5
              max-w-md
            "
          >
            <p className="text-gray-200 dhurjati-regular  text-base leading-relaxed">
              Secure authentication experience with modern global identity
              verification and seamless onboarding for the next generation of
              digital platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logo;