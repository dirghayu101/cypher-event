const socket = io()
const chat = document.querySelector('#chat')
const messageContainer = document.querySelector('.messageContainer')
const user = JSON.parse(localStorage.getItem('user'));
const {rNum, password} = user

socket.emit('joinRoom', {rNum, password})

// Message from server.
socket.on('message', (message) => {
    console.log(message)
    showMessage(message)
    // TODO: Put some sound
    messageContainer.scrollTop = messageContainer.scrollHeight  //This will scroll the page to the latest messages received.
})

// Listener for message submit to server.
chat.addEventListener('click', sendChatMessage)

// Function for listener.
function sendChatMessage(){
    // Get message text.
    let messageBox = document.querySelector('#msg')
    let chatMessage = messageBox.value
    if(!chatMessage){
        return
    }
    // Emit message to server.
    socket.emit('chatMessage', chatMessage)
    messageBox.value = ''


}

// This will put the message on the DOM.
function showMessage(message) {
    const div = document.createElement('div')
    div.classList.value = message.css
    div.innerHTML = `<h6>${message.username}</h6>
    <p>${message.text}</p>
    <p>${message.time}</p>`
    messageContainer.appendChild(div)
}
