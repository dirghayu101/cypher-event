const { formatMessage } = require("../utils/formatMessages");
const botName = "Agent Jennifer";
const {
  updateUserSocketID,
  getUserByRNum,
} = require("../db/pseudoDB");
const welcomeMessage = "Welcome to Cypher!";
const cssValues = {
  bot: "container-fluid serverMessage messages important",
  first: "container-fluid myMessage messages first",
  second: "container-fluid myMessage messages second",
  third: "container-fluid myMessage messages third",
};

let activeUsers = []; //Can be a column or something instead.

handleSocketConnection = (socket, io) => {
  socket.on("joinRoom", ({ rNum, password, grpName }) => {
    let user = getUserByRNum(rNum, password, grpName, socket);
    activeUsers.push({ name: user.name, rNum, grpName, sID: socket.id });
    let repeatUser = activeUsers.filter((val) => val.rNum === user.rNum).length;
    if (repeatUser <= 1) {
      welcomeAndInformGrp(socket, grpName, user);
    }
    // Join the group
    socket.join(grpName);
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

  // Listen for chat messages from the client.
  socket.on("chatMessage", ({ msg, rNum, password, grpName }) => {
    user = getUserByRNum(rNum, password, grpName, socket);
    io.to(grpName).emit(
      "message",
      formatMessage(user.name, msg, cssValues["first"])
    );
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
