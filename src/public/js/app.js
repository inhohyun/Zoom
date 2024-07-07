const messageList = document.querySelector("#messages"); // ul 요소 선택
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to Server 😀");
});

socket.addEventListener("message", (message) => {
    console.log("New message:", message.data);

    const li = document.createElement("li"); // 메시지를 받으면 새로운 li 태그 생성
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("Disconnected to Server 😥");
});

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    const message = { type: "message", payload: input.value }; // 메시지 형식을 JSON으로 변경
    socket.send(JSON.stringify(message)); // 메시지를 JSON 형식으로 전송
    input.value = "";
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    const nickname = { type: "nickname", payload: input.value }; // 닉네임 형식을 JSON으로 변경
    socket.send(JSON.stringify(nickname)); // 닉네임을 JSON 형식으로 전송
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit); // 닉네임 폼 이벤트 수정
