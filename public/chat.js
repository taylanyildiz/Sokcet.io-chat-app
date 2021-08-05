const socket = io.connect('http://localhost:3050');

const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submitButton = document.getElementById('submitButton');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');


submitButton.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        sender: sender.value,
    });
});

socket.on('chat', data => {
    output.innerHTML += '<p><strong>' + data.sender + ':</strong>' + data.message + '</p>'
    message.value = '';

});

message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value);
});

socket.on('typing', data => {
    feedback.innerHTML = '<p>' + data + ' writing...</p>'
});