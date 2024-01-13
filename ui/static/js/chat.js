var socket = io()

var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        console.log(input.value)
        socket.emit('chat message', input.value)
        input.value = '';
    }
})

socket.on('chat message', (msg, id) => {
    var item = document.createElement('li');
    item.textContent = `${id}: ${msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });