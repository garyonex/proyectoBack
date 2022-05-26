const socket = io();
const divMessages = document.getElementById('messages');
const iEmail = document.getElementById('email');
const iTexto = document.getElementById('texto');
const button = document.getElementById('button');

button.addEventListener('click', (e) => {
    const texto = iTexto.value;
    iTexto.value = ' ';
    const email = iEmail.value;
    iEmail.value = '';
    const message = {
        user: email,
        text: texto,
        date: dateNow(),
    };
    socket.emit('new-message', message);
});
socket.on('messages', (messages) => {
    divMessages.innerHTML = messages
        .map((message) => {
            if (message.user === email) {
                return `
            <div class="list-group chat">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 usuario">${message.user}</h5>
                    <small>${message.date}</small>
                </div>
                <p class="mb-1">${message.text}</p>
            </div>
            `;
            } else {
                return `
            <div class="list-group">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${message.user}</h5>
                    <small>${message.date}</small>
                </div>
                <p class="mb-1">${message.text}</p>
             </div>
            `;
            }
        })
        .join(' ');
});

dateNow = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
};
