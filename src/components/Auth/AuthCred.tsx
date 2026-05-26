// AuthCred.tsx

import React, { useState } from "react";
import Options from "./Options";

function AuthCred() {
  const [user, setUser] = useState({
    name: "",
    city: "",
    country: "",
    phoneNumber: "",
  });

  return (
    <div className="min-h-screen w-full bg-[#0a2926] flex items-center justify-center px-4 sm:px-6 lg:p-20 py-6 sm:py-10 overflow-x-hidden">
      {/* MAIN CARD */}
      <div
        className="
          w-full
          max-w-2xl
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          shadow-2xl
        "
      >
        {/* FORM CONTAINER */}
        <div className="w-full p-6 sm:p-8 md:p-10 lg:p-12">
          {/* HEADER */}
          <div className="mb-8 sm:mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
              Welcome
            </h1>

            <p className="text-sm sm:text-base text-gray-400">
              Create your secure account
            </p>
          </div>

          {/* FORM */}
          <div className="space-y-4 sm:space-y-5">
            {/* NAME */}
            <div>
              <input
                type="text"
                placeholder="John Doe"
                value={user.name}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="
                  w-full
                  bg-white/10
                  border border-white/10
                  text-white
                  placeholder:text-gray-500
                  px-4
                  py-3
                  sm:py-4
                  rounded-xl
                  outline-none
                  focus:border-cyan-400
                  transition-all
                  text-sm
                  sm:text-base
                "
              />
            </div>

            {/* COUNTRY */}
            <div>
              <input
                type="text"
                placeholder="India"
                value={user.country}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
                className="
                  w-full
                  bg-white/10
                  border border-white/10
                  text-white
                  placeholder:text-gray-500
                  px-4
                  py-3
                  sm:py-4
                  rounded-xl
                  outline-none
                  focus:border-cyan-400
                  transition-all
                  text-sm
                  sm:text-base
                "
              />
            </div>

            {/* CITY */}
            <div>
              <input
                type="text"
                placeholder="Mumbai"
                value={user.city}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                className="
                  w-full
                  bg-white/10
                  border border-white/10
                  text-white
                  placeholder:text-gray-500
                  px-4
                  py-3
                  sm:py-4
                  rounded-xl
                  outline-none
                  focus:border-cyan-400
                  transition-all
                  text-sm
                  sm:text-base
                "
              />
            </div>

            {/* OTP + PHONE SECTION */}
            <Options
              name={user.name}
              city={user.city}
              country={user.country}
              phoneNumber={user.phoneNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthCred;
