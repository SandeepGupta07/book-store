const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

regd_users.post("/",(req,res) => {
  users.push({"username":req.query.username,"password":req.query.password});
  res.send("The user" + (' ')+ (req.query.username) + " Has been added!")
})
//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.query.username;
  const userpassword = req.query.password;
  const fliteruser=Object.values(users).filter((user) => user.username == username&&user.password==userpassword);
    if (fliteruser!={}) {
        return res.status(404).json({message: "Body Empty"});
    }
    let accessToken = jwt.sign({
        data: fliteruser
      }, 'access', { expiresIn: 60 * 60 });

      req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const ISBN = req.params.isbn.toString();
  let filtered_book = Object.values(books).filter((book) => book.isbn == ISBN);
  if(filtered_book=={}){
    return res.status(300).json({message: "book not found"});
  }
  filtered_book.reviews={}
  return res.status(300).json({message: "book reviews been modify"});
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const ISBN = req.params.isbn.toString();
  let filtered_book = Object.values(books).filter((book) => book.isbn == ISBN);
  if(filtered_book=={}){
    return res.status(300).json({message: "book not found"});
  }
  return res.status(300).json({message: "book  been delete"});
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
