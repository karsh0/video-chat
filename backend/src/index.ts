import express from "express"
import webSocket, { WebSocketServer } from "ws";
import http from "http";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server}, ()=>
    console.log("server running onport 3000"));

interface User{
    username: string,
    socket: webSocket
}

const users:User[] = []

wss.on("connection",(ws, message)=>{
    const parsedMessage = JSON.parse(message as unknown as string);
    if(parsedMessage.type == "CHAT"){
        const {username, message} = parsedMessage;
        users.forEach(u =>{
            u.socket.send(JSON.stringify({
                type:"NEW_MESSAGE",
                message,
                username
            }))
        })
    }    
})


app.use(express.json());
server.listen(3000);