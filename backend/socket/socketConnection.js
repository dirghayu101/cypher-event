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
const firstQuestionArr = [`We have some hostile organisations on our radar. They are not very delighted with the recent India-Israel deal and fancy giving us a lesson.`, `Our sources say they are planning something big. We have got hold of some social media handles of some hostile organisations which might carry out these plans.`,`Agents your task is to find out the most likely of them behind this conspiracy.`, `Since this is a recent development you should start by carrying out a thorough analysis of their recent social media post.`, `The Instagram usernames are:`,`1. order_of_the_black_hand`,`2. infernal_syndicate`,`3. the_dark_empire_`]


const introductionArr = [`As the saying goes advent of enemies is a sign of progress.`, `We as a country have been progressing and uplifting our people, and certain organisations cannot tolerate our people’s happiness.`, `These groups want and try to pull us down at every opportunity they get and we here at cypher ensure that this doesn’t happen.`, `We have one single objective, our country should prevail and flourish without any external friction.`, `This chat is a 128-bit encrypted interface nothing is stored here and it is meant for confidential communication.`, `Whatever we discuss here will be off the record.`, `You might wonder how I am typing this fast and Jennifer sound very un-Indian. These are pre-recorded instructions and Jennifer is my pseudonym.`, `I will only tip you about things necessary for the mission. Since this is a pre-recorded chat, you have to be very specific about your answer format.`,`There are two buttons, the rightmost button will send an answer to me and also the group. I will assign some officers to do further investigation based on your suggestions and this will cost us resources.`, `To drop a message to me, click the pink button.`, `You can use the blue button to chat in your group.`]

let activeUsers = []; //Can be a column or something instead.

handleSocketConnection = (socket, io) => {
  socket.on("joinRoom", async ({ rNum, password, grpName }) => {
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
  
  async function welcomeAndInformGrp(socket, grpName, user) {
    // This will emit to single client that is connecting. Welcome client.
    let alreadyAnswered = await checkAnswered(grpName)         //If the person is reconnecting, then we won't show them the first question again.
    if(alreadyAnswered){
      return
    } 
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


    introductionArr.forEach((val) => {
      socket.emit(
        "message",
        formatMessage(botName, val, cssValues["bot"])
      );
    })

    firstQuestionArr.forEach((val) => {
      socket.emit(
        "message",
        formatMessage(botName, val, cssValues["bot"])
      );
    })
      

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