const socket = io();
const chatButton = document.querySelector("#chat");
const messageContainer = document.querySelector(".messageContainer");
const chatInputBox = document.querySelector("#msg");
const user = JSON.parse(localStorage.getItem("user"));
const { rNum, password, grpName, name: userName } = user;
socket.emit("joinRoom", { rNum, password, grpName });
const serverAndClientCommunication = [];
const audio = new Audio("../assets/audio/ting.mp3");

// Function to play sound upon arrival of a new message in chat box.
function playSound() {
  audio.play();
}

// Message from server.
socket.on("message", (message) => {
  if (message.username === "Jenny") {
    serverAndClientCommunication.push({ user: "Bot", text: message.text });
  }
  showOthersMessage(message);
  messageContainer.scrollTop = messageContainer.scrollHeight; //This will scroll the page to the latest messages received.
});

// Listener for message submit to server.
chatButton.addEventListener("click", sendChatMessage);
chatInputBox.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    chatButton.click();
  }
});

// Function for listener.
function sendChatMessage() {
  // Get message text.
  let msg = chatInputBox.value;
  if (!msg) {
    return;
  }
  // Emit message to server.
  socket.emit("chatMessage", { msg, rNum, password, grpName }, function (ack) {
    if (ack === "received") {
      showUserMessage(msg);
    } else {
      alert("Connection failed!");
    }
  });
  //   Clear the text box for message.
  chatInputBox.value = "";
}

// This will put the message on the DOM.
function showOthersMessage(message) {
  const div = document.createElement("div");
  div.classList.value = message.css;
  div.innerHTML = `<h6>Agent ${message.username}</h6>
    <p>${message.text}</p>
    <p>${message.time}</p>`;
  messageContainer.appendChild(div);
  playSound();
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

function showUserMessage(message) {
  const div = document.createElement("div");
  div.classList.value = "container-fluid  myMessage messages second";
  div.innerHTML = `<h6>${userName}</h6>
    <p>${message}</p>
    <p>${getCurrentTime()}</p>`;
  messageContainer.appendChild(div);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

function getCurrentTime() {
  const now = new Date();
  // Get the current time in hours and minutes
  const hours = now.getHours();
  const minutes = now.getMinutes();
  // Format the time as HH:MM
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  return formattedTime;
}
