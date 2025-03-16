import Chatbox from "@/components/stream/Chatbox";
import Queue from "@/components/stream/Queue";
import Video from "@/components/stream/Video";
import { useSocket } from "@/hooks/useSocket";

export default function Stream() {
    const {socket, messages} = useSocket();
    
  return (
    <div className="w-screen h-screen bg-black text-white relative">
      <div className="flex w-full h-full justify-between">
        <div className="w-[75%] flex">
            <Queue/>
            <Video/>
        </div>
        <div className="w-[25%] h-full border-red-100 border-l-[1px] fixed top-0 right-0">
          <Chatbox socket={socket} messages={messages} />
        </div>
      </div>
    </div>
  );
}
