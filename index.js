const express = require('express');
const app = express();
require('dotenv').config()
const socket = require('socket.io');
const { port } = require("./util/config")

app.use(express.static('public'));



const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

const io = socket(server);
io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', (reason) => {
        console.log('user disconnected:', reason);
        socket.broadcast.emit('pre_disconnect', reason);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('typing', (msg) => {
        socket.broadcast.emit('typing', msg);
    })
})