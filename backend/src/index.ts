import express from "express"
import webSocket, { WebSocketServer } from "ws";
import http from "http";
import router from "./router";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server}, ()=>
    console.log("server running onport 3000"));

interface User{
    socket: webSocket
}

const users:User[] = []

wss.on("connection",(ws, request)=>{
    users.push({
        socket: ws
        //get the username from auth
    })

    ws.on("message", (message)=>{
    const parsedMessage = JSON.parse(message as unknown as string);
    if(parsedMessage.type == "CHAT"){
        const {message} = parsedMessage;
        users.forEach(u =>{
            u.socket.send(JSON.stringify({
                type:"NEW_MESSAGE",
                message,
            }))
        })
    }    
    })
})


app.use(express.json());
app.use('/', router);
server.listen(3000, ()=>{
    console.log("server running on port 3000")
});