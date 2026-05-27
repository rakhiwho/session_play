import { useState } from "react";

import axios from "axios";
const API_URL = "https://session-backend-c3xs.onrender.com";


import { toast } from "sonner";

function useWatchDuration() {
  const [loading, setLoading] = useState(false);

  const [watchData, setWatchData] = useState(null);

  // SAVE WATCH DURATION
  const saveWatchDuration = async ({
    phoneNumber,
    videoId,
    watchedDuration,
  }: {
    phoneNumber: string;
    videoId: string;
    watchedDuration: number;
  }) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/watched-duration/save`,
        {
          phoneNumber,
          videoId,
          watchedDuration,
        },
      );

      return res.data;
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Failed to save watch duration",
      );
    } finally {
      setLoading(false);
    }
  };

  // GET WATCH DURATION
  const getWatchDuration = async ({
    phoneNumber,
    videoId,
  }: {
    phoneNumber: string;
    videoId: string;
  }) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/api/watched-duration`,
        {
          params: {
            phoneNumber,
            videoId,
          },
        },
      );

      setWatchData(res.data.data);
      return res.data.data;
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Failed to fetch watch duration",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    watchData,
    saveWatchDuration,
    getWatchDuration,
  };
}

export default useWatchDuration;
