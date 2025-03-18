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
import { data } from "react-router-dom";

interface videoInterface{
 videos:{
  id: number,
  url: string,
  upvote: number,
  userId: string
 }
}
export default function Queue() {
  const [videos, setVideos] = useState<any>()
  useEffect(()=>{
    const fetchVideos = async () => {
        const res = await axios.get<videoInterface>(`${BACKEND_URL}/videos`);
        console.log(res.data.videos);
        setVideos(res.data.videos)
    };

    fetchVideos(); 
  },[])


  const urlRef = useRef<HTMLInputElement | null>(null)

  async function addHandler(){
    const videoUrl = urlRef.current?.value;
    const res = await axios.post(`${BACKEND_URL}/video`,{
     
        url: videoUrl
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      
    })

    console.log(res);
  }

  return (
    <div className="w-72">
     
        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold">Videos in Queue</span>
          {JSON.stringify(videos)}
          <div className="w-full h-20 border border-white rounded-md p-1 flex text-white gap-4 items-center">
          <img src="https://img.youtube.com/vi/QvXVNyqOMv4/0.jpg" alt="image" className="w-30 h-full" />
          <p>Added by karan</p>
          </div>
        
          
       <Dialog>
       <DialogTrigger className="bg-white text-black font-semibold rounded-md px-3 py-2 w-full">Add video</DialogTrigger>
       <DialogContent className="w-96">
         <DialogHeader>
           <DialogTitle>Add your favorites in Queue</DialogTitle>
           <DialogDescription>
             This action cannot be undone.
           </DialogDescription>
           <Input ref={urlRef} placeholder="Enter youtube video url"/>
           <Button onClick={addHandler}>Add</Button>
         </DialogHeader>
       </DialogContent>
     </Dialog>
    </div>  
      </div>
  );
}
