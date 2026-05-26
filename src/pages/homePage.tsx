import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Video from "../components/Home/Video";
import Drescription from "../components/Home/Drescription";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";

const API_URL = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const navigate = useNavigate();
const name = localStorage.getItem('username');
  const [user, setUser] = useState(null);
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
        setUser(response.data.user);
      } else {
        navigate("/auth");
      }

    } catch (error) {
      console.log("Unauthorized");
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-h-screen pt-0 h-screen w-full bg-emerald-600/80 text-white flex flex-col justify-center items-center">
      
      {/* Header */}
      <Header />

      {/* USER INFO */}
      <div className="mb-4">
        {name && (
          <span className="text-green-300">
            Welcome, {name || "User"}!
          </span>
        )}
      </div>

      {/* Video */}
      <Video />

      {/* Content */}
      <Drescription />

      {/* Footer */}
      <Footer />
    </div>
  );
}