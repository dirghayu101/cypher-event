const { formatMessage } = require("../utils/formatMessages");
const botName = "Jenny";
const { getUserByRNum } = require("../db/pseudoDB");
const welcomeMessage = "Welcome to Cypher!";
const multipleTabMessage = `It seems like you have opened multiple tab. You won't be able to communicate on this tab.`
const cssValues = {
  bot: "container-fluid serverMessage messages important",
  first: "container-fluid messages first",
  second: "container-fluid messages second",
};

let activeUsers = []; //Can be a column or something instead.

handleSocketConnection = (socket, io) => {
  socket.on("joinRoom", ({ rNum, password, grpName }) => {
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