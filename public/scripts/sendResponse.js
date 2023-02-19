const sendBtn = document.querySelector("#serverSend");

sendBtn.addEventListener("click", submitAnswer);
const serverWarnMessage = `Are you sure you want to go ahead with this answer Agent ${userName}? We will spend resources based on your direction and it will cost us time. If you are confident about your choice submit 'CONFIRM' and we will proceed. Otherwise type anything else to cancel this request.`;

/*
 * The algorithm will delete the top of array. <-- Dry run it with this case.
 *
 */

function submitAnswer(event) {
  event.preventDefault();
  let msgValue = chatInputBox.value;
  if (!msgValue) {
    return;
  }
  sendChatMessage();  //! This is the point
  serverAndClientCommunication.push({ user: userName, text: msgValue });
  let arrLength = serverAndClientCommunication.length;
  if (
    (msgValue === "CONFIRM" || msgValue === "confirm") &&
    serverAndClientCommunication.length >= 4
  ) {
    serverMessageGroupDisplay(
      `As we have received your confirmation, we will be proceeding with your request agent ${userName}.`
    );
    postAnswer();
    return;
  }
  if (serverAndClientCommunication[arrLength - 2].text === serverWarnMessage) {
    // Check if the server asked client for confirmation.
    serverMessageGroupDisplay(
      `As I didn't receive any confirmation agent ${userName}, we won't be proceeding with your request. We are working on borrowed time, I advice you to be vigilant.`
    );
    return;
  }
  serverMessageGroupDisplay(serverWarnMessage);

}

async function postAnswer() {
  // NOTE: The database will store the question going on. Because every device might differ in that and database will be a unifying point for an entire group.
  let arrLength = serverAndClientCommunication.length;
  const message = serverAndClientCommunication[arrLength - 4].text;
  const result = await fetch("/user/chatScreen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rNum,
      password,
      grpName,
      userName,
      answer: message,
    }),
  }).then((res) => res.json());
  // NOTE: This will be the response by server to the answer posted by user.
  serverMessageGroupDisplay(result.message);
}

function serverSendMessage(message) {
  serverAndClientCommunication.push({ user: "Bot", text: message });
  const div = document.createElement("div");
  div.classList.value = "container-fluid serverMessage messages important";
  div.innerHTML = `<h6>Agent Jenny</h6>
      <p>${message}</p>
      <p>${getCurrentTime()}</p>`;
  messageContainer.appendChild(div);
  chatInputBox.value = "";
  playSound();
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

function serverMessageGroupDisplay(message){
  console.log("in server message group display emitting method.")
  socket.emit('serverMessageSend', { msg:message, rNum, password, grpName }, function(ack){
    if(ack === 'received'){
      serverSendMessage(message)
    } else {
      alert("Connection failed!");
    }
  })
}
