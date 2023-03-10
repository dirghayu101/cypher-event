const app = require("./app");
const http = require('http')
const server = http.createServer(app)
const dotenv = require("dotenv");
const socketio = require('socket.io')
const io = socketio(server)
const connectDatabase  = require("./db/connect");
const handleSocketConnection = require("./socket/socketConnection");
dotenv.config({ path: __dirname + "/config.env" });
const PORT = process.env.PORT;
  
io.on('connection', socket => {
  handleSocketConnection(socket, io)
})

const start = async () => {
  try{
    connectDatabase()
    server.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  }catch(error){
    console.log(error)
  }
};
  
start();

module.exports = {server, io}