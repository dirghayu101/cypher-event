const { formatMessage } = require("../utils/formatMessages");
const botName = "Jenny";
const welcomeMessage = "Welcome to Cypher!";
const multipleTabMessage = `It seems like you have opened multiple tab. You won't be able to communicate on this tab.`
const cssValues = {
  bot: "container-fluid serverMessage messages important",
  first: "container-fluid messages first",
  second: "container-fluid messages second",
};
const User = require('../models/user')

handleSocketConnection = (socket, io) => {
  socket.on("joinRoom", async ({ rNum, password, grpName }) => {

    let user = await getUserByRNum(rNum, password, grpName, socket);

    // NOTE: Active Users array use
    user.connectionTimes.push({name: user.name, rNum, grpName, sID: socket.id})
    await User.findOneAndUpdate({rNum}, user)
    user = await User.findOne({rNum: user.rNum})
    let repeatUser = user.connectionTimes.length
    //! Ends here.
    if (repeatUser <= 1) {
      welcomeAndInformGrp(socket, grpName, user);
      socket.join(grpName);
    } else{
      preventRepeatConnection(user)
    }
    // Join the group
  });

  async function getUserByRNum(rNum, password, grpName, socket){
    let user = await User.findOne({rNum})
    if(!user || user.password != password || user.grpName != grpName){
      socket.disconnect()
    }
    return user
  }

  function welcomeAndInformGrp(socket, grpName, user) {
    // This will emit to single client that is connecting. Welcome client.
    socket.emit(
      "message",
      formatMessage(botName, welcomeMessage, cssValues["bot"])
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
  }

  async function preventRepeatConnection(user){
    // NOTE: Active User array use.
    let rNum = user.rNum
    user = user.connectionTimes.filter((val) => val.sID != socket.id)
    await User.findOneAndUpdate({rNum}, {connectionTimes:user})
    //! Ends here.

    socket.emit(
      "message",
      formatMessage(botName, multipleTabMessage, cssValues["bot"])
    );
    socket.disconnect()
  }

  async function getCurrentUser(){
    let users = await User.find()
    for(ele of users){
      for(val of ele.connectionTimes){
        if(val.sID === socket.id)
          return ele
      }
    }
  }

  // Listen for chat messages from the client.
  socket.on("chatMessage", async function ({ msg, rNum, password, grpName }, ack) {
    let user = await getUserByRNum(rNum, password, grpName, socket);
    console.log(user.cssValue)
    socket
      .to(grpName)
      .emit("message", formatMessage(user.name, msg, user.cssValue));
    ack("received");

  });

  // io.emit will broadcast to everyone. Runs when disconnect.
  socket.on("disconnect", async () => {
    // NOTE: Active User Array use.
    let user = await getCurrentUser()
    if(!user){
      return
    }
    let rNum = user.rNum
    user = user.connectionTimes.filter((val) => val.sID != socket.id)
    await User.findOneAndUpdate({rNum}, {connectionTimes:user})
    user = await User.findOne({rNum})
    let numberOfUsers = user.length
    //! Ends here.

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
