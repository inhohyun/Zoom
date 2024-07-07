import http from "http";
import WebSocket from "ws";

import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get(".*", (_, res) => res.redirect("/"));
const handleLiten = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleLiten);
const server = http.createServer(app); //http 서버
const wss = new WebSocket.Server({ server }); // ws 서버
// function handleConnection(socket) {
//     console.log(socket)
// }
wss.on("connection", (socket) => {
    console.log("Connected to Browser 😀")
    socket.send("hello!!");
})
server.listen(3000, handleLiten); //http와 ws가 같은 포트를 사용
