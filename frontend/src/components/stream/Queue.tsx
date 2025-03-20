import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

export default function Queue({videos, setVideos}:{videos:any, setVideos:any}) {

  function getYouTubeVideoId(url: string) {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  }

  function getYouTubeThumbnail(url: string) {
    const videoId = getYouTubeVideoId(url);
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/0.jpg`
      : "/fallback-thumbnail.jpg"; 
  }


  return (
    <div className="w-72">
      <div className="flex flex-col gap-4">
        <span className="text-xl font-semibold">Videos in Queue</span>

        {videos?.length > 0 ? (
          videos.map((x) => (
            <div key={x.id} className="w-full h-20 border border-white rounded-md p-1 flex text-white gap-4 items-center">
              <img src={getYouTubeThumbnail(x.url) ?? ""} alt="Thumbnail" className="w-30 h-full" />
              <p>Added by {x.userId}</p>
            </div>
          ))
        ) : (
          <p>No videos in the queue</p> 
        )}

  
      </div>
    </div>
  );
}
