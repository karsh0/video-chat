import { Button } from "@/components/ui/button";
import { FeatCard } from "@/components/ui/Featcard";
import Navbar from "@/components/ui/Navbar";
import { Lock, MessageSquareMore, ListVideo, ThumbsUp } from "lucide-react"; 

export default function Landing() {
    return (
        <div className="max-w-screen  m-h-screen bg-black text-white">
            <Navbar />
            <div className="container min-w-full pt-28 py-20 flex flex-col gap-5 justify-center items-center">
                <div className="py-16 flex flex-col gap-5 justify-center items-center">
                    <span className="text-5xl font-bold">
                        <span className="text-red-600">Watch</span> Chat Connect
                    </span>
                    <p className="text-xl text-gray-400 text-center">
                        A secure and private messaging platform where conversations happen in the dark.<br/> 
                        Share your thoughts without sharing your identity.
                    </p>
                    <div className="flex gap-2">
                        <Button variant="destructive" className="p-5">Join Now</Button>
                        <Button className="p-5">Explore</Button>
                    </div>
                </div>

                <div className="w-full grid grid-cols-4 gap-2">
                    <FeatCard 
                        title="End-to-End Encryption" 
                        desc="Ensures that all messages remain private and secure, allowing only the intended recipients to read them." 
                        Icon={Lock}
                    />
                    <FeatCard 
                        title="Anonymous Messaging" 
                        desc="Chat freely without revealing personal details, keeping your identity private." 
                        Icon={MessageSquareMore} 
                    />
                    <FeatCard 
                        title="Queue based Playback" 
                        desc="Watch videos in a shared queue, ensuring seamless and synchronized viewing for everyone." 
                        Icon={ListVideo} 
                    />
                    <FeatCard 
                        title="Upvoting" 
                        desc="Let the community decide what plays next by voting for their favorite videos in the queue." 
                        Icon={ThumbsUp} 
                    />
                </div>
            </div>
        </div>
    );
}
