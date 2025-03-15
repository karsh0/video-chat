import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef } from "react";

interface Message {
    type: string;
    message: string;
  }

export default function Chatbox({socket, messages}:{socket: WebSocket, messages: Message[]}) {
   const messageRef = useRef<HTMLInputElement | null>(null);

   const sendMessage = () => {
    if (!socket) {
      alert("Socket not connected");
      return;
    }

    socket.send(
      JSON.stringify({
        type: "CHAT",
        message: messageRef.current?.value || "",
      })
    );
    messageRef.current!.value = "";
  };

  return (
    <div className="w-full h-full flex flex-col justify-end gap-3 p-5 bg-black text-white">
      {
        messages.map((m, index) => {
            return <div key={index}>{m.message}</div>
        })
      }
      <div className="flex justify-between gap-3">
        <Input ref={messageRef} id="message" placeholder="Enter your message" />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
