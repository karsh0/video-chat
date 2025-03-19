import { useState } from "react";
import { Button } from "../ui/button";

export default function Video({videos, setVideos}:{videos:any, setVideos:any}){
    const [videoId, setVideoId] = useState('KCQEJZLD0pI')

    function getYouTubeVideoId(url: string) {
        const match = url.match(/[?&]v=([^&]+)/);
        return match ? match[1] : null;
      }
    
    function nextHandler(){
        const nextVideoId = getYouTubeVideoId(videos[0].url);
        console.log(videos[0])
        setVideoId(nextVideoId) 
        videos.shift()
    }

    return <div className="p-5">
        <iframe width="600" height="400"
        src={`https://www.youtube.com/embed/${videoId}` || ""}>
        </iframe>
        <Button onClick={nextHandler}>Play Next</Button>
    </div>
} 