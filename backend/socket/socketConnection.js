const { formatMessage } = require("../utils/formatMessages");
const botName = "Agent Jennifer";
const { Users } = require("../db/pseudoDB");
const welcomeMessage = "Welcome to Cypher!";
const userJoinedChat = "A user has joined the chat.";
const userLeftChat = "A user has left the chat.";
let user
const cssValues = {
  bot: "container-fluid serverMessage messages important",
  first: "container-fluid myMessage messages first",
  second: "container-fluid myMessage messages second",
  third: "container-fluid myMessage messages third",
};

handleSocketConnection = (socket, io) => {
  socket.on("joinRoom", ({ rNum, password }) => {
    user = Users.find((val) => val.rNum === rNum);
    if (user.password != password) {
      socket.disconnect();
    }

    // This will emit to single client that is connecting. Welcome client.
    socket.emit(
      "message",
      formatMessage(botName, welcomeMessage, cssValues["bot"])
    );

    // This will emit to everyone except for the user.
    socket.broadcast
      .to(user.grpName)
      .emit(
        "message",
        formatMessage(botName, userJoinedChat, cssValues["bot"])
      );
  });

  // Listen for chat messages from the client.
  socket.on("chatMessage", (msg) => {
    io.to(user.grpName).emit(
      "message",
      formatMessage("USER", msg, cssValues["first"])
    );
  });

  // io.emit will broadcast to everyone. Runs when disconnect.
  socket.on("disconnect", () => {
    io.to(user.grpName).emit(
      "message",
      formatMessage(botName, userLeftChat, cssValues["bot"])
    );
  });
};

module.exports = handleSocketConnection;
