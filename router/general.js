const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  console.log(req.body.username, req.body.password);
  let filtered_users = users.filter((user) => user.username === req.body.username);
  console.log(filtered_users);

  if (filtered_users.length > 0) {
    return res.status(300).json({ message: "Sorry !! User already exist" });
  }

  users.push({ username: req.body.username, password: req.body.password })
  return res.status(300).json({ message: "Customer successfull register . You can login now" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  return res.status(300).json({ books: books });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  let entries = Object.entries(books)
  let data;
  entries.map(([key, val] = entry) => {
    if (key == isbn) {
      data = val;
    };
  });
  return res.status(300).json(data);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let entries = Object.entries(books)
  let data = [];
  entries.map(([key, val] = entry) => {
    if (val.author == author) {
      data.push(val)
    };
  });
  return res.status(300).json({ booksbyauthor: data });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let entries = Object.entries(books)
  let data = [];
  entries.map(([key, val] = entry) => {
    if (val.title == title) {
      data.push(val)
    };
  });
  return res.status(300).json({ booksbytitle: data });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  let entries = Object.entries(books)
  let data;
  entries.map(([key, val] = entry) => {
    if (key == isbn) {
      data = val.reviews;
    };
  });
  return res.status(300).json(data);
});

module.exports.general = public_users;
