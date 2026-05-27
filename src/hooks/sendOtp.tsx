import { useState } from "react";
import axios from "axios";
const API_URL = (import.meta as any).env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface IUser {
  name: string;
  city: string;
  country: string;
  phoneNumber: string;
}

function UseAuth() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<IUser>({
    name: "",
    city: "",
    country: "",
    phoneNumber: "",
  });

  // SEND OTP
  const sendOtp = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/auth/send-otp`,
        {
          phoneNumber: user.phoneNumber,
        },
      );

      toast.success(res.data.message || "OTP Sent Successfully", {
        duration: 3000,
      });
    } catch (error: any) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to send OTP", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP + CREATE USER
  const verifyOtp = async (otp: string) => {
    try {
      setLoading(true);
      if (!otp) {
        console.log(otp);
        toast.error("Please enter OTP");
        return;
      }
      // VERIFY OTP
      const verifyRes = await axios.post(
        `${API_URL}/api/auth/verify-otp`,
        {
          phoneNumber: user.phoneNumber,
          otp,
        },
        {
          withCredentials: true,
        },
      );

      console.log("VERIFY:", verifyRes.data);

      toast.success("OTP Verified Successfully");

      // CREATE USER
      const createUser = await axios.post(
        `${API_URL}/api/auth/create`,
        user,
        {
          withCredentials: true,
        },
      );

      console.log("USER:", createUser.data);
         
     // localStorage.setItem("user", `${JSON.stringify(user)}`);

      toast.success("User Created Successfully");

      navigate("/");
    } catch (error: any) {
      console.log(error.response?.data);

      toast.error(error?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };
  return {
    user,
    setUser,
    loading,
    sendOtp,
    verifyOtp,
  };
}

export default UseAuth;
