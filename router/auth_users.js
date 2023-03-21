const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  { 
    username:"sandeep",
    password : "sandeep@gmail.com"
  }
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  let filtered_users = users.filter((user) => user.username === req.body.username && user.password === req.body.password);
    const user = req.body.user;
    if (filtered_users.length == 0) {
        return res.status(404).json({message: "User not found"});
    }

    console.log(filtered_users);
    let accessToken = jwt.sign({
        data: filtered_users['0']
      }, 'access', { expiresIn: 60 * 60 });

      req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let review = req.query.review;
  let entries = Object.entries(books)
  entries.map(([key, val] = entry) => {
    if (key == isbn) {
      val.reviews= review;
      res.send(`the review for the book is updated successfully`);
    }else{
      res.send("Unable to find book!");
    }

  });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let entries = Object.entries(books)
  entries.map(([key, val] = entry) => {
    if (key == isbn) {
      val.reviews= {};
      res.send(`the review for the book is deleted successfully`);
    }else{
      res.send("Unable to find book!");
    }

  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
