"use client";
import Youtube from "react-youtube";
import { useState } from "react";

function getYouTubeID(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/.*v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/
  );
  return match ? match[1] : null;
}

export default function YoutubePlayer({ videoUrl }: { videoUrl: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const videoId = getYouTubeID(videoUrl);

  const option = {
    width : "100%",
    height : "100%",
    autoplay : 0,
  }
  if (!videoId) {
    return <p className="text-center text-red-500">Invalid YouTube URL</p>;
  }


  return (
    <div className="w-full h-64 md:h-96 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-600 animate-pulse rounded">
          <p className="text-white">Loading video...</p>
        </div>
      )}
      <Youtube
        videoId={videoId}
        opts={option}
        className="w-full h-full"
        onReady={() => setIsLoading(false)}
      />
    </div>
  );
}
