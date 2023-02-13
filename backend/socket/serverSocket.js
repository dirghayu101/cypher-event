class ServerSocket {
  constructor(user) {
    this.userArray = [];
    this.grpID = user.grpID;
    this.insertUser(user.rNum);
    this.portNumber = this.findFreePort();
    this.printInfo();
  }

  insertUser(rNum) {
    this.userArray.push(rNum);
  }

  findFreePort() {
    portFinder.getPort(function (err, port) {
      if (err) {
        return console.log(err);
      }
      return port
    });
  }

  printInfo() {
    console.log(typeof this.portNumber);
    console.log(
      `The users in this object are:\n${this.userArray}\nThe group ID is ${this.grpID}\nThe port is ${this.portNumber}`
    );
  }
}

module.exports = {ServerSocket};
