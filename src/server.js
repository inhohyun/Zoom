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
const server = http.createServer(app); // http 서버
const wss = new WebSocket.Server({ server }); // ws 서버

const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket);

    socket["nickname"] = "Anon"; // 닉네임을 지정하지 않은 사람은 Anon으로 뜸
    console.log("Connected to Browser 😀");

    socket.on("close", () => {
        console.log("Disconnected from the Browser 😥");
    });

    socket.on("message", (message) => { // 브라우저가 서버에 메시지를 보냈을 때
        const parsed = JSON.parse(message); // JSON 형식의 메시지를 파싱
        switch (parsed.type) {
            case "message":
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${parsed.payload}`)); // 모든 소켓들에게 메시지 보내기
                break;
            case "nickname":
                console.log(parsed.payload);
                socket["nickname"] = parsed.payload;
                break;
        }


    });

    // socket.send(JSON.stringify({ type: "message", payload: "hello!!" })); // 초기 연결 시 메시지 보내기
});

server.listen(3000, handleLiten); // http와 ws가 같은 포트를 사용
