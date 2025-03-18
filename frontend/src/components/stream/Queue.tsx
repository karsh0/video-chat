import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

interface Video {
  id: number;
  url: string;
  upvote: number;
  userId: string;
}

interface VideoResponse {
  videos: Video[];
}

export default function Queue() {
  const [videos, setVideos] = useState<Video[]>([]);
  const urlRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get<VideoResponse>(`${BACKEND_URL}/videos`);
        setVideos(res.data.videos || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]); /
      }
    };

    fetchVideos();
  }, []);

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

  async function addHandler(event: React.FormEvent) {
    event.preventDefault();
    const videoUrl = urlRef.current?.value;
    if (!videoUrl) return;

    try {
      const res = await axios.post(
        `${BACKEND_URL}/video`,
        { url: videoUrl },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      console.log(res);

      setVideos((prev) => [...prev, res.data.video]); 
      if (urlRef.current) urlRef.current.value = "";

    } catch (error) {
      console.error("Error adding video:", error);
    }
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

        <Dialog>
          <DialogTrigger className="bg-white text-black font-semibold rounded-md px-3 py-2 w-full">
            Add video
          </DialogTrigger>
          <DialogContent className="w-96">
            <DialogHeader>
              <DialogTitle>Add your favorites in Queue</DialogTitle>
              <DialogDescription>This action cannot be undone.</DialogDescription>
              <form onSubmit={addHandler}>
                <Input ref={urlRef} placeholder="Enter YouTube video URL" />
                <Button type="submit">Add</Button>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
