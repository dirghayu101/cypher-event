const sendBtn = document.querySelector("#serverSend");
const proceedMessage = `As we have received your confirmation, we will be proceeding with your request agent ${userName}.`;
const notProceedMessage = `As I didn't receive any confirmation agent ${userName}, we won't be proceeding with your request. We are working on borrowed time, I advice you to be vigilant.`;
const serverAndClientCommunication = [];
const serverWarnMessage = `Are you sure you want to go ahead with this answer Agent ${userName}? We will spend resources based on your direction and it will cost us time. If you are confident about your choice submit 'CONFIRM' and we will proceed. Otherwise type anything else to cancel this request.`;

sendBtn.addEventListener("click", submitAnswer);
function submitAnswer(event) {
  event.preventDefault();
  let msgValue = chatInputBox.value;
  if (!msgValue) {
    return;
  }
  sendChatMessage(); //! Group display the user chat.
  let arrLength = serverAndClientCommunication.length;
  serverAndClientCommunication.push({ user: userName, text: msgValue });
  if (arrLength === 0) {
    serverMessageGroupDisplay(serverWarnMessage);
    return;
  }
  if (
    (msgValue === "CONFIRM" ||
      msgValue === "confirm" ||
      msgValue === "Confirm") ||
      msgValue.trim() === "confirm" ||
      msgValue.trim() === "CONFIRM"
      &&
    arrLength >= 2
  ) {
    serverMessageGroupDisplay(proceedMessage);
    postAnswer();
    return;
  }
  if (serverAndClientCommunication[arrLength - 1].text === serverWarnMessage) {
    // Check if the server asked client for confirmation.
    serverMessageGroupDisplay(notProceedMessage);
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
  if (result.correctAnswer) {
    result.nextQuestion.forEach(part => serverMessageGroupDisplay(part))
  }
}

async function serverSendMessage(message) {
  const div = document.createElement("div");
  div.classList.value = "container-fluid serverMessage messages important";
  div.innerHTML = `<h6>Agent Jenny</h6>
      <p>${message}</p>
      <p>${getCurrentTime()}</p>`;
  messageContainer.appendChild(div);
  chatInputBox.value = "";
  await playSound();
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

function serverMessageGroupDisplay(message) {
  if (
    message === serverWarnMessage ||
    message === proceedMessage ||
    message === notProceedMessage
  ) {
    serverAndClientCommunication.push({ user: "Bot", text: message });
  }
  socket.emit(
    "serverMessageSend",
    { msg: message, rNum, password, grpName },
    function (ack) {
      if (ack === "received") {
        setTimeout(serverSendMessage(message), 4000);
      } else {
        alert("Connection failed!");
      }
    }
  );
}

const helpButton = document.querySelector('#contactUs')
const helpMessage = `If you are facing any difficulty or any issues, feel free to contact any of the organizers by whichever mean you feel comfortable in:<br>
<br>
1.  +917668722367 - Dirghayu Joshi<br>
2.  +916376084170 - Tushar Mishra<br>
3.  +919108955449 - Heenal Jain<br>
<br>
Remember, we are here to help you!`
helpButton.addEventListener('click', printHelpSource)
function printHelpSource(event){
  setTimeout(serverSendMessage(helpMessage), 4000)
}

const lastQuestionButton = document.querySelector('#lastQuestion')
lastQuestionButton.addEventListener('click', getQuestion)
async function getQuestion(event){
  event.preventDefault()
  const result = await fetch(`/user/lastQuestion/${grpName}`).then((res) => res.json());
  if(result.success){
    result.currentQuestion.forEach(part => setTimeout(serverSendMessage(part), 3000))
  } else{
    setTimeout(serverSendMessage(result.currentQuestion), 3000)
  }
}
