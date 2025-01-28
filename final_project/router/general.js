import express from "express";
import books from "./booksdb.js";
import { isValid, users } from "./auth_users.js";

export const public_users = express.Router();

public_users.post("/register", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
    return res.status(200).send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", (req, res) => {
    const key = Object.keys(books).find(key => books[key].isbn === req.params.isbn);

    if (!key) {
        return res.status(404).send(`Book with ISBN ${req.params.isbn} not found.`);
    }

    return res.status(200).send(JSON.stringify(books[key]));
});

// Get book details based on author
public_users.get("/author/:author", (req, res) => {
    const keys
});

// Get all books based on title
public_users.get("/title/:title", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get("/review/:isbn", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});
