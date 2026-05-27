import { useEffect, useState } from "react";
import AuthCred from "../components/Auth/AuthCred";
import Logo from "../components/Auth/Logo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL =  "https://session-backend-c3xs.onrender.com";

export default function AuthPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe();
  }, []);

  // CHECK AUTH
  const getMe = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/auth/me`,
        {
          withCredentials: true,
        }
      );
      console.log("Auth Check Response:", response.data);

      // IF USER LOGGED IN
      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log("Unauthorized");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-emerald-200/20 text-white flex items-center justify-center">
      <div className="w-screen grid lg:grid-cols-2 md:grid-cols-2 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950">
        
        <Logo />

        <AuthCred />

      </div>
    </div>
  );
}
