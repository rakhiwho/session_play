import React, { useEffect, useRef } from "react";

import useUploadVideo from "../../hooks/video";

import useWatchDuration from "../../hooks/saveGetWatch.duration";

function Video() {
  const { videos, fetchLoading } = useUploadVideo();

  const { saveWatchDuration, getWatchDuration } = useWatchDuration();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [buffered , setBuffered] = React.useState(0);
   const phoneNumber = localStorage.getItem("user") || "";
  // FIRST VIDEO
  const firstVideo = videos?.[0];
 
  // SAVE WATCH DURATION
  const saveWatchTime = async () => {
    try {
      if (!videoRef.current || !firstVideo) return;

      const currentTime = videoRef.current.currentTime;
      // GET OLD WATCH DATA
      const oldWatch = await getWatchDuration({
        phoneNumber:phoneNumber,
        videoId: firstVideo.id,
      });
 
      // ONLY UPDATE
      // IF CURRENT TIME
      // IS GREATER
      if (oldWatch && oldWatch.watchedDuration > currentTime) {
        return;
      }

      // SAVE TO LOCAL STORAGE
      localStorage.setItem(
        `watch-${firstVideo.id}`,

        JSON.stringify({
          watchedSeconds: currentTime,

          updatedAt: new Date().toISOString(),
        }),
      );

      // SAVE TO DATABASE
      await saveWatchDuration({
        phoneNumber :phoneNumber,
        videoId: firstVideo.id,
        watchedDuration: currentTime,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // RESTORE WATCH TIME
  useEffect(() => {
    const restoreTime = async () => {
      try {
        if (!videoRef.current || !firstVideo) return;

        // FETCH SAVED DATA
        const watchData = await getWatchDuration({
          phoneNumber : phoneNumber,
          videoId: firstVideo.id,
        });

        // SET VIDEO TIME
        if (watchData && watchData.watchedDuration) {
          videoRef.current.currentTime = watchData.watchedDuration;

          // ALSO STORE LOCALLY
          localStorage.setItem(
            `watch-${firstVideo.id}`,

            JSON.stringify({
              watchedSeconds: watchData.watchedDuration,

              updatedAt: new Date().toISOString(),
            }),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (firstVideo) {
      restoreTime();
    }
  }, [firstVideo]);

  // AUTO SAVE EVERY 5 SECONDS
  useEffect(() => {
    const interval = setInterval(() => {
      saveWatchTime();
    }, 5000);

    return () => clearInterval(interval);
  }, [firstVideo]);

  // SAVE WHEN USER CLOSES TAB
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveWatchTime();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [firstVideo]);

  return (
    <section id="video" className="relative">
      <div className=" rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900">
        {fetchLoading ? (
          <div className="aspect-video flex items-center justify-center text-white">
            Loading video...
          </div>
        ) : firstVideo ? (
          <video
            ref={videoRef}
            className="w-full aspect-video"
            controls
            autoPlay
            // SAVE WHEN PAUSED
            onPause={saveWatchTime}
            // SAVE WHEN VIDEO ENDS
            onEnded={saveWatchTime}
          >
            <source src={firstVideo.videoUrl} type="video/mp4" />
            Your browser does not support video.
          </video>
        ) : (
          <div className="aspect-video flex items-center justify-center text-zinc-400">
            No videos found
          </div>
        )}
      </div>
    </section>
  );
}

export default Video;
