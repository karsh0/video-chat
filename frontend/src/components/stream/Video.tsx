import { useRef, useState } from "react";
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



export default function Video({videos, setVideos}:{videos:any, setVideos:any}){
    const [videoId, setVideoId] = useState('KCQEJZLD0pI')
  const urlRef = useRef<HTMLInputElement | null>(null);


    function getYouTubeVideoId(url: string) {
        const match = url.match(/[?&]v=([^&]+)/);
        return match ? match[1] : null;
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
    function nextHandler(){
        const nextVideoId = getYouTubeVideoId(videos[0].url);
        console.log(videos[0])
        setVideoId(nextVideoId) 
        videos.shift()  //FIX
    }

    return <div className="p-5">
        <iframe width="600" height="400"
        src={`https://www.youtube.com/embed/${videoId}` || ""}>
        </iframe>
      
        <Dialog>
          <DialogTrigger className="bg-white text-black font-semibold rounded-md px-2 py-1">
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
        <Button onClick={nextHandler}>Play Next</Button>
    </div>
} 