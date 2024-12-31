require("dotenv").config();
const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sigma",
  password: process.env.PASSWORD,
});

app.get("/", (req, res) => {
  let q = "SELECT username FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      let count = result.length;
      let usersname = [];
      for (let i = 0; i < result.length; i++) {
        usersname.push(result[i]["username"]);
      }
      res.render("home", { count, usersname });
    });
  } catch (error) {
    console.log(error);
  }
});

//get all user
app.get("/user", (req, res) => {
  let q = "SELECT * FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      res.render("show", { result });
    });
  } catch (error) {
    console.log(error);
  }
});

//get perticular user
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}' `;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit", { user });
    });
  } catch (error) {
    console.log(error);
  }
});

//update data
app.patch("/user/:id", (req, res) => {
  res.send("updated");
  // let {id} = req.params
  // let q = `SELECT * FROM user WHERE id = '${id}' `

  // try {
  //     connection.query(q,(err,result)=>{
  //         if(err) throw err
  //         let user = result[0]
  //         res.render("edit",{user})
  //     })
  // } catch (error) {
  //     console.log(error);
  // }
});

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
