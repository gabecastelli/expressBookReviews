import express from "express";
import books from "./booksdb.js";
import { isValid, users } from "./auth_users.js";

export const public_users = express.Router();
public_users.use(express.json());

public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Missing username or password.");
    }

    if (users.some(user => user.username === username)) {
        return res.status(409).send(`Username ${username} already exists.`);
    }

    users.push({ "username": username, "password": password });
    return res.status(200).send(`New user ${username} registered successfully.`);
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
    return res.status(200).send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const matchingBook = getBookFromISBN(books, isbn);

    if (!matchingBook) {
        return res.status(404).send(`Book with ISBN ${isbn} not found.`);
    }

    return res.status(200).send(JSON.stringify(matchingBook));
});

// Get book details based on author
public_users.get("/author/:author", (req, res) => {
    const author = req.params.author;
    const matchingKeys = Object.keys(books).filter(key => books[key].author === author);
    const matchingBooks = matchingKeys.reduce((acc, key) => books[key], []);

    if (!matchingBooks) {
        return res.status(404).send(`Books with author ${author} not found.`);
    }

    return res.status(200).send(JSON.stringify(matchingBooks));
});

// Get all books based on title
public_users.get("/title/:title", (req, res) => {
    const title = req.params.title;
    const matchingKeys = Object.keys(books).filter(key => books[key].title === title);
    const matchingBooks = matchingKeys.reduce((acc, key) => books[key], []);

    if (!matchingBooks) {
        return res.status(404).send(`Books with title ${title} not found.`);
    }

    return res.status(200).send(JSON.stringify(matchingBooks));
});

//  Get book review
public_users.get("/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const matchingBook = getBookFromISBN(books, isbn);

    if (!matchingBook) {
        return res.status(404).send(`Book with ISBN ${isbn} not found.`);
    }

    return res.status(200).send(JSON.stringify(matchingBook.reviews));
});

function getBookFromISBN(books, isbn) {
    const matchingKey = Object.keys(books).find(key => books[key].isbn === isbn);
    
    return books[matchingKey];
}
