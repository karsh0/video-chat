import { useEffect, useRef, useState } from "react";

interface Message {
  type: string;
  message: string;
}

export function useSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      setSocket(socket);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received:", data);
      setMessages((prev) => [...prev, data]); // Add new message to state
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setSocket(null);
    };

    return () => {
      socket.close();
    };
  }, []);

  return { socket, messages };
}
