import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = (import.meta as any).VITE_API_URL;
import { toast } from "sonner";

interface IVideo {
  id: string;
  title: string;
  videoUrl: string;
  createdAt: string;
}

function useUploadVideo() {
  // =========================
  // STATES
  // =========================
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [videos, setVideos] = useState<IVideo[]>([]);

  const [fetchLoading, setFetchLoading] = useState(false);

  // =========================
  // UPLOAD VIDEO
  // =========================

  const uploadVideo = async (file: File) => {
    try {
      if (!file) {
        toast.error("Please select a video");

        return;
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("video", file);

      const res = await axios.post(
        `${API_URL}/api/video/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              ((progressEvent.loaded || 0) * 100) / (progressEvent.total || 1),
            );

            setProgress(percent);
          },
        },
      );

      toast.success("Video uploaded successfully", {
        duration: 3000,
      });

      // REFRESH VIDEOS
      getVideos();

      return res.data;
    } catch (error: any) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Upload failed", {
        duration: 3000,
      });
    } finally {
      setLoading(false);

      setTimeout(() => {
        setProgress(0);
      }, 2000);
    }
  };

  const getVideos = async () => {
    try {
      setFetchLoading(true);

      const res = await axios.get(`${API_URL}/api/video/`);
      console.log(res.data);
      setVideos(res.data.data);
    } catch (error: any) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to fetch videos", {
        duration: 3000,
      });
    } finally {
      setFetchLoading(false);
    }
  };

   
  useEffect(() => {
    getVideos();
  }, []);

  return {
    uploadVideo,
    getVideos,
    videos,
    loading,
    fetchLoading,
    progress,
  };
}

export default useUploadVideo;
