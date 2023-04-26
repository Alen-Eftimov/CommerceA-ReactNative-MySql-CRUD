/* eslint-disable quotes */

const express = require("express");
const app = express();
const port = process.env.PORT || 3500;

const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
  port: "3307",
});

app.listen(port, () => {
  //   var host = server.address().address;
  //   var port = server.address().port;
  console.log("Hello Alen");
});

con.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("connected");
  }
});

app.get("/users", (req, res) => {
  con.query("select * from users", (error, rows, fields) => {
    if (error) {
      console.log(error);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});

app.post("/users", (req, res) => {
  const sql =
    "INSERT INTO users (`name`, `username`, `email`, `address`) VALUES (?)";
  // const values = ["title from backend", "description from backend", "image_cover picture from backend"]
  const values = [
    req.body.name,
    req.body.username,
    req.body.email,
    req.body.address,
  ];
  con.query(sql, [values], (error, data) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log(data);
      res.json("Users has been created successfuly.");
    }
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";

  con.query(sql, [userId], (error, data) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.warn(data);
      res.json("User has been deleted successfuly.");
    }
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const sql =
    "UPDATE users SET `name` = ?, `username` = ?, `email` = ?, `address` = ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.username,
    req.body.email,
    req.body.address,
  ];

  con.query(sql, [...values, userId], (error, data) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log(data);
      res.json("User has been updated successfuly.");
    }
  });
});
