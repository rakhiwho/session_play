// Options.tsx

import React, { useEffect, useState } from "react";
import UseAuth from "../../hooks/sendOtp";

function Options({
  name,
  city,
  country,
  phoneNumber,
}: {
  name: string;
  city: string;
  country: string;
  phoneNumber: string;
}) {
  const [newOtp, setNewOtp] = useState("");

  const { user, setUser, loading, sendOtp, verifyOtp } =
    UseAuth();

  useEffect(() => {
    setUser((prev: any) => ({
      ...prev,
      name,
      city,
      country,
      phoneNumber,
    }));
  }, [name, city, country, phoneNumber]);

  return (
    <div className="space-y-5">
      
      {/* PHONE + BUTTON */}
      <div className="flex items-center gap-3">
        
        {/* PHONE INPUT */}
        <input
          type="tel"
          placeholder="+91 9876543210"
          value={user.phoneNumber}
          onChange={(e) =>
            setUser((prev: any) => ({
              ...prev,
              phoneNumber: e.target.value,
            }))
          }
          className="
            flex-1
            min-w-0
            bg-white/10
            border border-white/10
            text-white
            placeholder:text-gray-500
            px-4 py-3 sm:py-4
            rounded-xl
            outline-none
            focus:border-cyan-400
            transition-all
            text-sm sm:text-base
          "
        />

        {/* SEND OTP BUTTON */}
        <button
          type="button"
          onClick={sendOtp}
          disabled={loading}
          className="
            shrink-0
            bg-emerald-500/70
            hover:bg-emerald-400
            text-white
            font-semibold
            px-4 sm:px-5
            py-3 sm:py-4
            rounded-xl
            transition-all
            disabled:opacity-50
            text-sm sm:text-base
            whitespace-nowrap
          "
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </div>

      {/* OTP INPUT */}
      <div>
        <input
          type="text"
          placeholder="Enter OTP"
          value={newOtp}
          onChange={(e) => setNewOtp(e.target.value)}
          className="
            w-full
            bg-white/10
            border border-white/10
            text-white
            placeholder:text-gray-500
            px-4 py-3 sm:py-4
            rounded-xl
            outline-none
            focus:border-emerald-400
            transition-all
            text-sm sm:text-base
          "
        />
      </div>

      {/* CONTINUE BUTTON */}
      <button
        onClick={() => verifyOtp(newOtp)}
        type="button"
        className="
          w-full
          bg-white
          text-black
          py-3 sm:py-4
          rounded-xl
          font-semibold
          hover:bg-gray-200
          transition-all
          text-sm sm:text-base
        "
      >
        Proceed
      </button>
    </div>
  );
}

export default Options;