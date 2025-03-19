import Chatbox from "@/components/stream/Chatbox";
import Queue from "@/components/stream/Queue";
import Video from "@/components/stream/Video";
import { useSocket } from "@/hooks/useSocket";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { useEffect, useState } from "react";

interface Video {
  id: number;
  url: string;
  upvote: number;
  userId: string;
}

interface VideoResponse {
  videos: Video[];
}


export default function Stream() {
    const {socket, messages} = useSocket();
      const [videos, setVideos] = useState<Video[]>([]);
    
    useEffect(() => {
      const fetchVideos = async () => {
        try {
          const res = await axios.get<VideoResponse>(`${BACKEND_URL}/videos`);
          setVideos(res.data.videos);
        } catch (error) {
          console.error("Error fetching videos:", error);
          setVideos([]); 
        }
      };
      fetchVideos();
    }, []);

    console.log(videos)
    
  return (
    <div className="w-screen h-screen bg-black text-white relative">
      <div className="flex w-full h-full justify-between">
        <div className="w-[75%] flex">
            <Queue videos={videos} setVideos={setVideos}/>
            <Video  videos={videos} setVideos={setVideos}/>
        </div>
        <div className="w-[25%] h-full border-red-100 border-l-[1px] fixed top-0 right-0">
          <Chatbox socket={socket} messages={messages} />
        </div>
      </div>
    </div>
  );
}
