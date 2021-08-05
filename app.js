const express = require('express');
const socketio = require('socket.io');

const app = express();

const server = app.listen(3050);

app.use(express.static('public'));

const io = socketio(server);

io.on('connection', (socket) => {
    console.log('Connected Server ' + socket.id);

    socket.on('chat', data => {
        io.emit('chat', data);
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing',data);
    });
})
