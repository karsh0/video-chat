import { getUser } from "@/actions/auth.actions";
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
  const { socket, messages } = useSocket();
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await axios.get<VideoResponse>(`${BACKEND_URL}/videos`);
              setVideos(res.data.videos);
          } catch (error) {
              console.error("Error fetching videos:", error);
              setVideos([]);
          }
      };

      fetchData();
  }, []);


  return (
      <div className="w-screen max-h-screen pt-24 bg-white text-black flex flex-col">
          <div className="flex w-full h-full flex-1 justify-between relative">
              <div className="w-[75%] md:flex justify-around">
                  <Queue videos={videos} setVideos={setVideos} />
                  <Video videos={videos} setVideos={setVideos} />
              </div>
              <div className="w-[25%] hidden md:block bg-white text-black h-full absolute bottom-0 right-0">
                  <Chatbox socket={socket} messages={messages} />
              </div>
          </div>
      </div>
  );
}
