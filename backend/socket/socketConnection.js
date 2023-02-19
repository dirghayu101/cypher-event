const { formatMessage } = require("../utils/formatMessages");
const botName = "Jenny";
const { getUserByRNum } = require("../db/pseudoDB");
const Questions = require('../models/question')
const multipleTabMessage = `It seems like you have opened multiple tab. You won't be able to communicate on this tab.`
const cssValues = {
  bot: "container-fluid serverMessage messages important",
  first: "container-fluid messages first",
  second: "container-fluid messages second",
};
const firstQuestion = `We have some hostile organizations on our radar who are not very amused with our country's harmony and progress. They are planning something big. <br><br>We have found these social media handles of those organizations. Agents your task is to find out the most likely of them behind this conspiracy. Since this is a recent development you should start with carrying out a thorough analysis of their recent social media post.`

const socialMediaList =  `<ol><li>Social Media 1.</li><li>Social Media 2.</li><li>Social media 3</li></ol>`
let activeUsers = []; //Can be a column or something instead.

handleSocketConnection = (socket, io) => {
  socket.on("joinRoom", async ({ rNum, password, grpName }) => {
    let alreadyAnswered = await checkAnswered(grpName)         //If the person is reconnecting, then we won't show them the first question again.
    if(alreadyAnswered){
      return
    } 
    let user = getUserByRNum(rNum, password, grpName, socket);
    activeUsers.push({ name: user.name, rNum, grpName, sID: socket.id });
    let repeatUser = activeUsers.filter((val) => val.rNum === user.rNum).length;
    if (repeatUser <= 1) {
      welcomeAndInformGrp(socket, grpName, user);
      socket.join(grpName);
    } else{
      preventRepeatConnection()
    }
    // Join the group
  });
  async function checkAnswered(grpName){
    let first = await Questions.findOne({qNum: 1})
    if(!first){
      return false
    }
    let find = first.grpAnswer.find((ele)=>{ 
     if(ele.hasAnswered === true && ele.grpName === grpName){
      return ele
     }
    })
    if(find){
      return true
    } else{
      return false
    }
  }
  function welcomeAndInformGrp(socket, grpName, user) {
    // This will emit to single client that is connecting. Welcome client.
    socket.emit(
      "message",
      formatMessage(botName, `We are pleased to welcome you to mission cypher Agent ${user.name}!`, cssValues["bot"])
    );

    // This will emit to everyone except for the user.
    socket.broadcast
      .to(grpName)
      .emit(
        "message",
        formatMessage(
          botName,
          `Agent ${user.name} has joined the chat!`,
          cssValues["bot"]
        )
      );

      socket.emit(
        "message",
        formatMessage(botName, firstQuestion, cssValues["bot"])
      );

      socket.emit(
        "message",
        formatMessage(botName, socialMediaList, cssValues["bot"])
      );
  }

  function preventRepeatConnection(){
    let findUser = activeUsers.find((val) => val.sID === socket.id);
    if (!findUser) {
      return;
    }
    let index = activeUsers.indexOf(findUser);
    activeUsers.splice(index, 1);
    socket.emit(
      "message",
      formatMessage(botName, multipleTabMessage, cssValues["bot"])
    );
    socket.disconnect()
  }

  // Listen for chat messages from the client.
  socket.on("chatMessage", function ({ msg, rNum, password, grpName }, ack) {
    user = getUserByRNum(rNum, password, grpName, socket);
    socket
      .to(grpName)
      .emit("message", formatMessage(user.name, msg, user.css));
    ack("received");

  });

  socket.on("serverMessageSend", function({msg, rNum, password, grpName}, ack){
    socket.broadcast
    .to(grpName)
    .emit(
      "message",
      formatMessage(
        botName,
        msg,
        cssValues["bot"]
      )
    );
    ack("received")
  })

  // io.emit will broadcast to everyone. Runs when disconnect.
  socket.on("disconnect", () => {
    let findUser = activeUsers.find((val) => val.sID === socket.id);
    if (!findUser) {
      return;
    }
    let index = activeUsers.indexOf(findUser);
    user = activeUsers[index];
    activeUsers.splice(index, 1);
    let numberOfUsers = activeUsers.filter(
      (val) => val.rNum === user.rNum
    ).length;
    if (numberOfUsers === 0) {
      io.to(user.grpName).emit(
        "message",
        formatMessage(
          botName,
          `Agent ${user.name} has left the chat!`,
          cssValues["bot"]
        )
      );
    }
  });
};

module.exports = handleSocketConnection;