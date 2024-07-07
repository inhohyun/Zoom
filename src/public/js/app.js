const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener("open", () => {
    console.log("Connected to Server 😀");
})

socket.addEventListener("message", (message) => {
    console.log("Just got this: ", message, "form the Server");
})

socket.addEventListener("close", () => {
    console.log("Connected to Server 😥");
})