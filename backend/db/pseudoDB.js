const cssValues = {
  first: "container-fluid messages first",
  second: "container-fluid messages second",
  third: "container-fluid messages third",
};

let Users = [
  // Checked
  {
    rNum: "20CMS001",
    name: "Ajay",
    fromSJU: false,
    college: "Christ academy institute for advanced studies",
    grpName: "First",
    password: "8431124342",
    css: cssValues["third"],
  },
  // Checked
  {
    rNum: "20CMS004",
    name: "Romi",
    fromSJU: false,
    college: "Christ academy institute for advanced studies",
    grpName: "First",
    password: "6363581250",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "20CMS002",
    name: "Gabriel",
    fromSJU: false,
    college: "Christ academy institute for advanced studies",
    grpName: "First",
    password: "7708850024",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "SPC2022UG318",
    name: "Arden",
    fromSJU: false,
    college: "St Paul's College",
    grpName: "Second",
    password: "7208715575",
    css: cssValues["third"],
  },
  // Checked
  {
    rNum: "SPC2022UG3498",
    name: "Ajin",
    fromSJU: false,
    college: "St Paul's College",
    password: "6363356169",
    grpName: "Second",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "20SPCBSC07",
    name: "Marian",
    fromSJU: false,
    college: "St Paul's College",
    password: "8296562569",
    grpName: "Second",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "209US85042",
    name: "Sinchana",
    fromSJU: false,
    college: "Christ Academy Institute for Advanced Studies",
    password: "7795184579",
    grpName: "Third",
    css: cssValues["third"],
  },
  // Checked
  {
    rNum: "209US85005",
    name: "Reuban",
    college: "Christ Academy Institute for Advanced Studies",
    fromSJU: false,
    password: "7349058057",
    grpName: "Third",
    css: cssValues["second"],
  },

  // Checked
  {
    rNum: "209US85010",
    name: "Shubha",
    college: "Christ Academy Institute for Advanced Studies",
    fromSJU: false,
    password: "9916342939",
    grpName: "Third",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "22BCAR0340",
    name: "Rahul",
    college: "JAIN (Demmed-To-Be-University)",
    fromSJU: false,
    password: "9630660903",
    grpName: "Fourth",
    css: cssValues["third"],
  },
  // Checked
  {
    rNum: "22BCAR0326",
    name: "Samkit",
    college: "JAIN (Demmed-To-Be-University)",
    fromSJU: false,
    password: "7974150900",
    grpName: "Fourth",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "22BCAR0129",
    name: "Garv",
    college: "JAIN (Demmed-To-Be-University)",
    fromSJU: false,
    password: "6361437933",
    grpName: "Fourth",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "21C01009",
    name: "Abhishek",
    college: "Presidency College",
    fromSJU: false,
    password: "6294124974",
    grpName: "Fifth",
    css: cssValues["third"],
  },
  // Checked
  {
    rNum: "21C01018",
    name: "Aman",
    college: "Presidency College",
    fromSJU: false,
    password: "6362419982",
    grpName: "Fifth",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "22C01023",
    name: "Ansh",
    college: "Presidency College",
    fromSJU: false,
    password: "9336406601",
    grpName: "Fifth",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "MS203508",
    name: "Harshini",
    college: "Mount Carmel college",
    fromSJU: false,
    password: "9380095593",
    grpName: "Seventh",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "MS203502",
    name: "Likitha",
    college: "Mount Carmel college",
    fromSJU: false,
    password: "7892283928",
    grpName: "Seventh",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "2241044",
    name: "Rose",
    college: "Christ (Deemed to be) University",
    fromSJU: false,
    password: "8848062542",
    grpName: "Sixth",
    css: cssValues["second"],
  },
  // Checked.
  {
    rNum: "2241050",
    name: "Sandra",
    college: "Christ (Deemed to be) University",
    fromSJU: false,
    password: "9074802415",
    grpName: "Sixth",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "223BCAB02",
    name: "Labbey",
    college: "St. Joseph's University",
    fromSJU: true,
    password: "6360791619",
    grpName: "Eighth",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "223BCAB10",
    name: "Nithish",
    college: "St. Joseph's University",
    fromSJU: true,
    password: "9663614603",
    grpName: "Eighth",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "223BCAB49",
    name: "Aditya",
    college: "St. Joseph's University",
    fromSJU: true,
    password: "9926608136",
    grpName: "Ninth",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "223BCAB03",
    name: "Madni",
    college: "St. Joseph's University",
    fromSJU: true,
    password: "9482091736",
    grpName: "Ninth",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "20BCAA13",
    name: "Karthik",
    college: "St. Joseph's University",
    fromSJU: true,
    password: "9980837695",
    grpName: "Tenth",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "223BCAB05",
    name: "Akarsh",
    college: "St. Joseph's University",
    fromSJU: true,
    password: "6282759838",
    grpName: "Eleventh",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "223BCAB01",
    name: "Astle",
    college: "St. Joseph's University",
    fromSJU: true,
    grpName: "Eleventh",
    password: "8590867797",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "223BCAB39",
    name: "Rino",
    college: "St. Joseph's University",
    fromSJU: false,
    password: "9061252777",
    grpName: "Eleventh",
    css: cssValues["third"],
  },
  // Checked
  {
    rNum: "21BCAR0103",
    name: "Anushree",
    college: "Jain (Deemed-to-be-University), Jayanagar",
    fromSJU: false,
    password: "9900515581",
    grpName: "Twelfth",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "21BCAR0163",
    name: "Manisha",
    college: "Jain (Deemed-to-be-University), Jayanagar",
    fromSJU: false,
    password: "9353316178",
    grpName: "Twelfth",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "21BCAR0107",
    name: "Dhanya",
    college: "Jain (Deemed-to-be-University), Jayanagar",
    fromSJU: false,
    password: "8431966784",
    grpName: "Twelfth",
    css: cssValues["third"],
  },

  // Checked
  {
    rNum: "21BCAR0182",
    name: "Aman",
    college: "Jain (Deemed-to-be-University), Jayanagar",
    fromSJU: false,
    password: "9074194013",
    grpName: "Thirteenth",
    css: cssValues["first"],
  },

  // Checked
  {
    rNum: "21BCAR0029",
    name: "Gunjit",
    college: "Jain (Deemed-to-be-University), Jayanagar",
    fromSJU: false,
    password: "8485983863",
    grpName: "Thirteenth",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "21BCAR0127",
    name: "Neer",
    college: "Jain (Deemed-to-be-University), Jayanagar",
    fromSJU: false,
    password: "9427673035",
    grpName: "Thirteenth",
    css: cssValues["third"],
  },
  // Checked
  {
    rNum: "21BCAR0027",
    name: "Gagan",
    college: "Jain (Deemed-to-be-University), Jayanagar",
    fromSJU: false,
    password: "9778148558",
    grpName: "Fourteenth",
    css: cssValues["third"],
  },
  // Checked
  {
    rNum: "21BCAR0032",
    name: "Harshit",
    college: "Jain (Deemed-to-be-University), Jayanagar",
    fromSJU: false,
    password: "7578006262",
    grpName: "Fourteenth",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "21BCAR0154",
    name: "Aaryan",
    college: "Jain (Deemed-to-be-University), Jayanagar",
    fromSJU: false,
    password: "9301690113",
    grpName: "Fourteenth",
    css: cssValues["first"],
  },

  // Checked
  {
    rNum: "22BCAR0281",
    name: "Naveen",
    college: "Jain (Deemed-to-be-University), Jayanagar",
    fromSJU: false,
    password: "7300310248",
    grpName: "Fifteenth",
    css: cssValues["third"],
  },
  //Checked
  {
    rNum: "22BCAR0529",
    name: "Darshan",
    college: "Jain (Deemed-to-be-University), Jayanagar",
    fromSJU: false,
    password: "7878550340",
    grpName: "Fifteenth",
    css: cssValues["second"],
  },

  // Checked
  {
    rNum: "22BCAR0244",
    name: "Dasham",
    college: "Jain (Deemed-to-be-University), Jayanagar",
    fromSJU: false,
    password: "7986541497",
    grpName: "Fifteenth",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "21C01045",
    name: "Divesh",
    college: "Presidency College",
    fromSJU: false,
    password: "6306823101",
    grpName: "Sixteenth",
    css: cssValues["third"],
  },

  // Checked
  {
    rNum: "21C01028",
    name: "Arindam",
    college: "Presidency College",
    fromSJU: false,
    password: "9696561656",
    grpName: "Sixteenth",
    css: cssValues["second"],
  },

  // Checked
  {
    rNum: "21C01162",
    name: "Vivian",
    college: "Presidency College",
    fromSJU: false,
    password: "9711770164",
    grpName: "Sixteenth",
    css: cssValues["first"],
  },

  // Checked
  {
    rNum: "20SPCBSC04",
    name: "Ishita",
    college: "St. Paul College",
    fromSJU: false,
    password: "9012933336",
    grpName: "Seventeenth",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "21SPCBSC10",
    name: "Zeel",
    college: "St. Paul College",
    fromSJU: false,
    password: "9316423550",
    grpName: "Seventeenth",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "20PMC010",
    name: "Sanjana",
    college: "Christ Academy Institute for Advanced Studies",
    fromSJU: false,
    password: "8618400994",
    grpName: "Eighteenth",
    css: cssValues["third"],
  },
  // Checked
  {
    rNum: "20CMS005",
    name: "Roshan",
    college: "Christ Academy Institute for Advanced Studies",
    fromSJU: false,
    password: "9818765428",
    grpName: "Eighteenth",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "20CMS008",
    name: "Tejashree",
    college: "Christ Academy Institute for Advanced Studies",
    fromSJU: false,
    password: "9916502855",
    grpName: "Eighteenth",
    css: cssValues["first"],
  },

  // Checked
  {
    rNum: "222ELCS02",
    name: "Anirudh",
    college: "St. Joseph's University",
    fromSJU: true,
    password: "9391027021",
    grpName: "Nineteenth",
    css: cssValues["third"],
  },

  // Checked
  {
    rNum: "222ELCS63",
    name: "Diya",
    college: "St. Joseph's University",
    fromSJU: true,
    password: "8958802048",
    grpName: "Nineteenth",
    css: cssValues["second"],
  },

  // Checked
  {
    rNum: "222ELCS42",
    name: "Yukta",
    college: "St. Joseph's University",
    fromSJU: true,
    password: "8008884493",
    grpName: "Nineteenth",
    css: cssValues["first"],
  },

  // Checked
  {
    rNum: "22BCAR0140",
    name: "Pratyush",
    college: "Jain Deemed to be University",
    fromSJU: false,
    password: "8406909448",
    grpName: "Twentieth",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "2241016",
    name: "Elena",
    college: "Christ university (central campus)",
    fromSJU: false,
    password: "6282893114",
    grpName: "Twenty-first",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "2241009",
    name: "Annette",
    college: "Christ deemed to be University (Central Campus)",
    fromSJU: false,
    password: "9513184401",
    grpName: "Twenty-first",
    css: cssValues["first"],
  },
  // Checked
  {
    rNum: "MS203532",
    name: "Chaya",
    college: "Mount Carmel college Autonomous",
    fromSJU: false,
    password: "8431533258",
    grpName: "Twenty-second",
    css: cssValues["third"],
  },
  // Checked
  {
    rNum: "MS203528",
    name: "Chandana",
    college: "Mount Carmel college Autonomous",
    fromSJU: false,
    password: "6363985268",
    grpName: "Twenty-second",
    css: cssValues["second"],
  },
  // Checked
  {
    rNum: "MS203540",
    name: "Anushree",
    college: "Mount Carmel college Autonomous",
    fromSJU: false,
    password: "7411818649",
    grpName: "Twenty-second",
    css: cssValues["first"],
  },

  // Checked
  {
    rNum: "2141125",
    name: "Om",
    college: "CHRIST (DEEMED TO BE UNIVERSITY), BANGALORE",
    fromSJU: false,
    password: "9002467677",
    grpName: "Twenty-third",
    css: cssValues["first"],
  },

  // Checked
  {
    rNum: "2141141",
    name: "Tushar",
    college: "CHRIST (DEEMED TO BE UNIVERSITY), BANGALORE",
    fromSJU: false,
    password: "9110894405",
    grpName: "Twenty-third",
    css: cssValues["third"],
  },

  // Checked
  {
    rNum: "2141124",
    name: "Nitin",
    college: "CHRIST (DEEMED TO BE UNIVERSITY), BANGALORE",
    fromSJU: false,
    password: "9789873085",
    grpName: "Twenty-third",
    css: cssValues["second"],
  },

  // Checked
  {
    rNum: "MS224441",
    name: "Sathya",
    college: "Mount Carmel college Autonomous",
    fromSJU: false,
    password: "9901878128",
    grpName: "Twenty-fourth",
    css: cssValues["third"],
  },

  // Checked
  {
    rNum: "MS224433",
    name: "Priya",
    college: "Mount Carmel college Autonomous",
    fromSJU: false,
    password: "8431463121",
    grpName: "Twenty-fourth",
    css: cssValues["first"],
  },

  // Checked
  {
    rNum: "MS224403",
    name: "Angel",
    college: "Mount Carmel college Autonomous",
    fromSJU: false,
    password: "7975163821",
    grpName: "Twenty-fourth",
    css: cssValues["second"],
  },

  // Checked
  {
    rNum: "21PYCS028",
    name: "Soujanya",
    college: "Jyoti Nivas College",
    fromSJU: false,
    password: "7019665304",
    grpName: "Twenty-fifth",
    css: cssValues["third"],
  },

  // Checked
  {
    rNum: "21PYCS027",
    name: "Samidha",
    college: "Jyoti Nivas College",
    fromSJU: false,
    password: "8095975674",
    grpName: "Twenty-fifth",
    css: cssValues["second"],
  },

  // Checked
  {
    rNum: "21PYCS011",
    name: "Chrisma",
    college: "Jyoti Nivas College",
    fromSJU: false,
    password: "8088270374",
    grpName: "Twenty-fifth",
    css: cssValues["first"],
  },

  // Checked
  {
    rNum: "20PCM007",
    name: "Surya",
    college: "Christ Academy Institute for Advance studies",
    fromSJU: false,
    password: "7899445454",
    grpName: "Twenty-sixth",
    css: cssValues["second"],
  },

  // Checked
  {
    rNum: "21BCAR0159",
    name: "Donthala",
    college: "Jain( Deemed-To-Be) University, Jayanagar",
    fromSJU: false,
    password: "8431832860",
    grpName: "Twenty-seventh",
    css: cssValues["third"],
  },

  // Checked
  {
    rNum: "22BCAR0490",
    name: "Sankalp",
    college: "Jain( Deemed-To-Be) University, Jayanagar",
    fromSJU: false,
    password: "9039910580",
    grpName: "Twenty-seventh",
    css: cssValues["first"],
  },

  // NOTE Dummy entries beyond this

  {
    rNum: "20BCAA20",
    name: "John",
    college: "St Francis Degree College",
    fromSJU: false,
    password: "aezakmiBAGUVIX",
    grpName: "Alpha-Test",
    css: cssValues["second"],
  },
  {
    rNum: "20BCAA21",
    name: "Jerry",
    college: "St Francis Degree College",
    fromSJU: false,
    password: "aezakmiBAGUVIX",
    grpName: "Alpha-Test",
    css: cssValues["third"],
  },
  {
    rNum: "20BCAA22",
    name: "Kiran",
    college: "St Francis Degree College",
    fromSJU: false,
    password: "aezakmiBAGUVIX",
    grpName: "Alpha-Test",
    css: cssValues["first"],
  },
  {
    rNum: "20BCAA23",
    name: "Shivani",
    college: "St Francis Degree College",
    fromSJU: false,
    password: "aezakmiBAGUVIX",
    grpName: "Beta-Test",
    css: cssValues["second"],
  },
  {
    rNum: "20BCAA24",
    name: "Jason",
    college: "St Francis Degree College",
    fromSJU: false,
    password: "aezakmiBAGUVIX",
    grpName: "Beta-Test",
    css: cssValues["third"],
  },
  {
    rNum: "20BCAA25",
    name: "Jaysimha",
    college: "St Francis Degree College",
    fromSJU: false,
    password: "aezakmiBAGUVIX",
    grpName: "Beta-Test",
    css: cssValues["first"],
  },
  {
    rNum: "20BCAA26",
    name: "Prasant",
    college: "St Francis Degree College",
    fromSJU: false,
    password: "aezakmiBAGUVIX",
    grpName: "Gama-Test",
    css: cssValues["second"],
  },
  {
    rNum: "20BCAA27",
    name: "Sherly",
    college: "St Francis Degree College",
    fromSJU: false,
    password: "aezakmiBAGUVIX",
    grpName: "Gama-Test",
    css: cssValues["third"],
  },
  {
    rNum: "20BCAA28",
    name: "Kartikaa",
    college: "St Francis Degree College",
    fromSJU: false,
    password: "aezakmiBAGUVIX",
    grpName: "Gama-Test",
    css: cssValues["first"],
  },
  {
    rNum: "20BCAA29",
    name: "Anushree",
    college: "St Francis Degree College",
    fromSJU: false,
    password: "aezakmiBAGUVIX",
    grpName: "Theta-Test",
    css: cssValues["second"],
  },
  {
    rNum: "20BCAA30",
    name: "Keshava",
    college: "St Francis Degree College",
    fromSJU: false,
    password: "aezakmiBAGUVIX",
    grpName: "Theta-Test",
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
