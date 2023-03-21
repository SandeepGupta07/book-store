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

    let entries = Object.entries(books)
    let data;
    entries.map(([key, val] = entry) => {
      if (key == isbn) {
        data = val.reviews;
      };
    });
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
  let filtered_users = books.filter((user) => console.log(user));
  // if (filtered_users.length > 0) {
  //     let filtered_user = filtered_users[0];
  //     let DOB = req.query.DOB;
  //     //if the DOB has changed
  //     if(DOB) {
  //         filtered_user.DOB = DOB
  //     }
  //     /*
  //     Include code here similar to the one above for other attibutes
  //     */
  //     users = users.filter((user) => user.email != email);
  //     users.push(filtered_user);
  //     res.send(`User with the email  ${email} updated.`);
  // }
  // else{
  //     res.send("Unable to find user!");
  // }
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
