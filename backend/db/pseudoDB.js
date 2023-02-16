// It's difficult to think of a proper database design at this point, so I am going to create a false database to test out my chat application and play around with its functionality.

const cssValues = {
  first: "container-fluid messages first",
  second: "container-fluid messages second",
  third: "container-fluid messages third", // Doesn't look that good.
};

let Users = [
  {
    userID: 1,
    rNum: "20BCAA01",
    name: "Jeshal",
    grpID: "G01",
    grpName: "Awakeners",
    password: "12345678",
    css: cssValues["first"],
  },
  {
    userID: 2,
    rNum: "20BCAA02",
    name: "Aneesh",
    grpID: "G02",
    password: "12345678",
    grpName: "Sleepers",
    css: cssValues["first"],
  },
  {
    userID: 3,
    rNum: "20BCAA03",
    name: "Jestin",
    grpID: "G03",
    password: "12345678",
    grpName: "Eclairs",
    css: cssValues["first"],
  },
  {
    userID: 4,
    rNum: "20BCAA04",
    name: "Aldrin",
    grpID: "G01",
    password: "12345678",
    grpName: "Awakeners",
    css: cssValues["second"],
  },
  {
    userID: 5,
    rNum: "20BCAA05",
    name: "Jeff",
    grpID: "G02",
    password: "12345678",
    grpName: "Sleepers",
    css: cssValues["second"],
  },
  {
    userID: 6,
    rNum: "20BCAA06",
    name: "Divya",
    grpID: "G03",
    password: "12345678",
    socketID: [],
    grpName: "Eclairs",
    css: cssValues["second"],
  },
  {
    userID: 7,
    rNum: "20BCAA07",
    name: "Bhargo",
    grpID: "G01",
    password: "12345678",
    grpName: "Awakeners",
    css: cssValues["third"],
  },
  {
    userID: 8,
    rNum: "20BCAA08",
    name: "Fahad",
    grpID: "G02",
    password: "12345678",
    grpName: "Sleepers",
    css: cssValues["third"],
  },
  {
    userID: 9,
    rNum: "20BCAA10",
    name: "Alwin",
    grpID: "G03",
    password: "12345678",
    grpName: "Eclairs",
    css: cssValues["third"],
  },
];

function getUserByRNum(rNum, password, grpName, socket) {
  let user = Users.find((val) => val.rNum === rNum);
  if (user.password != password || user.grpName != grpName) {
    socket.disconnect();
  }
  return user;
}

module.exports = { Users, getUserByRNum };
