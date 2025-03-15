import Chatbox from "@/components/stream/Chatbox";
import Video from "@/components/stream/Video";
import { useSocket } from "@/hooks/useSocket";

export default function Stream() {
    const {socket, messages} = useSocket();
    
  return (
    <div className="w-screen h-screen bg-black text-white">
      <div className="flex w-full h-full justify-between">
        <div className="w-[75%] flex justify-center">
            <Video/>
        </div>
        <div className="w-[25%] h-full border-red-100 border">
          <Chatbox socket={socket} messages={messages} />
        </div>
      </div>
    </div>
  );
}
