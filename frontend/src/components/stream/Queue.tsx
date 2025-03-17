import { useState } from "react";
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

export default function Queue() {

  const [videos, setvideos] = useState([])

  return (
    <div className="w-72">
     
        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold">Videos in Queue</span>
          <div className="w-full h-20 border border-white rounded-md p-1 flex text-white gap-4 items-center">
          <img src="https://img.youtube.com/vi/QvXVNyqOMv4/0.jpg" alt="image" className="w-30 h-full" />
          <p>Added by karan</p>
          </div>
          <div className="w-full h-20 border border-white rounded-md p-1 flex text-white gap-4 items-center">
          <img src="https://img.youtube.com/vi/QvXVNyqOMv4/0.jpg" alt="image" className="w-30 h-full" />
          <p>Added by karan</p>
          </div>
          <div className="w-full h-20 border border-white rounded-md p-1 flex text-white gap-4 items-center">
          <img src="https://img.youtube.com/vi/QvXVNyqOMv4/0.jpg" alt="image" className="w-30 h-full" />
          <p>Added by karan</p>
          </div>
          <div className="w-full h-20 border border-white rounded-md p-1 flex text-white gap-4 items-center">
          <img src="https://img.youtube.com/vi/QvXVNyqOMv4/0.jpg" alt="image" className="w-30 h-full" />
          <p>Added by karan</p>
          </div>
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
           <Input placeholder="Enter youtube video url"/>
           <Button>Add</Button>
         </DialogHeader>
       </DialogContent>
     </Dialog>
    </div>  
      </div>
  );
}
