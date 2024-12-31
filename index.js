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
  password: process.env.PASSWORD || "Bhargav2005",
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
  let { id } = req.params;
  let { password: formPass, username: newUserName } = req.body;

  let q = "SELECT * FROM user WHERE id = ?";
  connection.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (result.length === 0) {
      res.status(404).send("User not found");
      return;
    }

    const user = result[0];

    if (formPass !== user.password) {
      res.status(401).send("WRONG PASSWORD");
    } else {
      let q2 = "UPDATE user SET username = ? WHERE id = ?";
      connection.query(q2, [newUserName, id], (err, updateResult) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        res.redirect("/user");
      });
    }
  });
});

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
