


const API_URL = (import.meta as any).VITE_API_URL;
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface IUser {
  name: string;
  city: string;
  country: string;
  phoneNumber: string;
}


const verifyOtp = async ({ otp, user }: { otp: string; user: IUser }) => {
  try {
    const navigate = useNavigate();
    setLoading(true);

    // VALIDATION
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    // VERIFY OTP
    const verifyRes = await axios.post(
      `${API_URL}/api/watched-duration/verify-otp`,
      {
        phoneNumber: user.phoneNumber,
        otp,
        name: user.name,
      },
      {
        withCredentials: true,
      },
    );

    console.log("VERIFY:", verifyRes.data);

    // STORE USER DATA
    localStorage.setItem("user", user.phoneNumber);
    localStorage.setItem("username", user.name);

    toast.success("OTP Verified Successfully", {
      duration: 3000,
    });

    // CREATE USER
    const createUser = await axios.post(
      `${API_URL}/api/auth/create`,
      user,
      {
        withCredentials: true,
      },
    );

    console.log(createUser.data);

    toast.success("User Created Successfully", {
      duration: 3000,
    });

    navigate("/");
  } catch (error: any) {
    console.log(error?.response?.data);

    toast.error(
      error?.response?.data?.message || "Verification failed",
      {
        duration: 3000,
      },
    );
  } finally {
    setLoading(false);
  }
};

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
