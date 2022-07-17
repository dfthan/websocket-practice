const socket = io()

const username = document.getElementById("username"),
    message = document.getElementById("txt-message"),
    button = document.getElementById("btn-send"),
    output = document.getElementById("chat-container"),
    typingContainer = document.getElementById("typing-container")

button.addEventListener("click", () => {
    if (message.value.length > 0) {
        socket.emit("chat message", msg = {
            username: username.value,
            message: message.value
        })
        message.value = ""
    }
})

socket.on("chat message", (msg) => {
    const para = document.createElement("p")
    const message = document.createTextNode(`${msg.username}: ${msg.message}`)
    para.appendChild(message)

    output.appendChild(para)
    typingContainer.innerText = ""
})

message.addEventListener("keypress", () => {
    socket.emit("typing", username.value)
})

socket.on("typing", (user) => {
    typingContainer.innerText = `${user} is typing a message...`
})

socket.on("pre_disconnect", () => {
    const para = document.createElement("p")
    const message = document.createTextNode(`User disconnected`)
    para.appendChild(message)

    output.appendChild(para)

})