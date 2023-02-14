// It's difficult to think of a proper database design at this point, so I am going to create a false database to test out my chat application and play around with its functionality.

let Users = [
    {
        userID: 1,
        rNum: '20BCAA01',
        name: 'Jeshal',
        grpID: 'G01',
        grpName: 'Awakeners',
        password: '12345678',
    },
    {
        userID: 2,
        rNum: '20BCAA02',
        name: 'Aneesh',
        grpID: 'G02',
        password: '12345678',
        grpName: 'Sleepers',
    },
    {
        userID: 3,
        rNum: '20BCAA03',
        name: 'Jestin',
        grpID: 'G03',
        password: '12345678',
        grpName: 'Eclairs',
    },
    {
        userID: 4,
        rNum: '20BCAA04',
        name: 'Aldrin',
        grpID: 'G01',
        password: '12345678',
        grpName: 'Awakeners',
    },
    {
        userID: 5,
        rNum: '20BCAA05',
        name: 'Jeff',
        grpID: 'G02',
        password: '12345678',
        grpName: 'Sleepers',
    },
    {
        userID: 6,
        rNum: '20BCAA06',
        name: 'Divya',
        grpID: 'G03',
        password: '12345678',
        socketID: [],
        grpName: 'Eclairs',
    },
    {
        userID: 7,
        rNum: '20BCAA07',
        name: 'Bhargo',
        grpID: 'G04',
        password: '12345678',
        grpName: 'Charizard',
    },
]



function getUserByRNum(rNum, password, grpName, socket){
    let user = Users.find((val) => val.rNum === rNum);
    if (user.password != password || user.grpName != grpName) {
      socket.disconnect();
    }
    return user
}


module.exports = {Users, getUserByRNum}