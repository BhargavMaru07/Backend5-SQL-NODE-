//********************************GENERATING RANDOM USER USING FAKER*************************** */
// const { faker } = require("@faker-js/faker");

// const getRandomUser = () => {
//   return {
//     id: faker.string.uuid(),
//     username: faker.internet.username(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   };
// };

//********************************CONNECTING MYSQL************************************************ */
// Get the client
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sigma",
  password: "Bhargav2005",
});

/* 
//First Query

//store query in variable
let q = "SHOW TABLES";

//always put connection.query in try-catch block..
try {
    connection.query(q, (err, result) => {
        //check if any err, if yes then throw error and handle in catch block
    if (err) throw err;
        //write code
    console.log(result);
    console.log(result.length);
    console.log(result[0]);
  });
} catch (error) {
  console.log(error);
}

connection.end();
*/

//*************************************************INSERT VALUE ***************************************** */

/** 
//FOR SIGNLE VALUE INSERTION FOLLOW THIS METHOD AND ALSO PLACEHOLDER SYNTAX........
let q = "INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)"
let user = ['19','bhargavb','bhargav@gmail.comb','adsdb']
try {
    connection.query(q,user,(err,result)=>{
        if(err) throw err
        console.log(result);
    })
} catch (error) {
    console.log(error);
}

connection.end();

*/

/*
//FOR MULTIPLE VALUE INSERTION FOLLOW THIS METHOD AND ALSO PLACEHOLDER SYNTAX IN THIS WE PUT ONLY 1 '?' ........
//IN CONNECTION.QUERY WE PLACE USERS IN THIS WAY : '[USERS]' ... 
let q = "INSERT INTO user (id,username,email,password) VALUES ?"
let users = [
  ["29", "bhargavc", "bhargav@gmail.comc", "adsdbc"],
  ["39", "bhargavd", "bhargav@gmail.comd", "adsdbd"],
];
try {
    connection.query(q,[users],(err,result)=>{
        if(err) throw err
        console.log(result);
    })
} catch (error) {
    console.log(error);
}

connection.end();

 */

//********************************************INSERT IN BULK******************************************** */

const { faker } = require("@faker-js/faker");

const getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};
let q = "INSERT INTO user (id,username,email,password) VALUES ?";
let data = [];
for (let i = 0; i <= 100; i++) {
  data.push(getRandomUser()); //creating 100 fake data
}

try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (error) {
  console.log(error);
}

connection.end();
