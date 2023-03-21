const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  let myPromise = new Promise((req, res) => {
    setTimeout(() => {
      resolve("Promise resolved")
    }, 6000)
  })
  myPromise.then((books) => {
    res.send(JSON.stringify({ books }, null, 4));
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  let myPromise = new Promise((req, res) => {
    setTimeout(() => {
      resolve("Promise resolved")
    }, 6000)
  })
  myPromise.then((books) => {
    const ISBN = req.params.isbn.toString();
    let filtered_book = Object.values(books).filter((book) => book.isbn == ISBN);
    res.send(JSON.stringify({ filtered_book }, null, 4));
  })

});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  let myPromise = new Promise((req, res) => {
    setTimeout(() => {
      resolve("Promise resolved")
    }, 6000)
  })
  myPromise.then((books) => {
    const Author = req.params.author;
    let filtered_author = Object.values(books).filter((book) => book.author == Author);
    res.send(JSON.stringify({ filtered_author }, null, 4));
  })
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  let myPromise = new Promise((req, res) => {
    setTimeout(() => {
      resolve("Promise resolved")
    }, 6000)
  })
  myPromise.then((books) => {
    const Title = req.params.title;
  let filtered_Title = Object.values(books).filter((book) => book.title == Title);
  res.send(JSON.stringify({ filtered_Title }, null, 4));
  })
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const ISBN = req.params.isbn.toString();
  let filtered_book = Object.values(books).filter((book) => book.isbn == ISBN);
  let filered_reviews = filtered_book.reviews
  res.send(JSON.stringify({ filered_reviews }, null, 4));
});

module.exports.general = public_users;
