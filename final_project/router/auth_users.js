import express from 'express';
import jwt from 'jsonwebtoken';
import books from './booksdb.js';

export const regd_users = express.Router();

export let users = [];

export const isValid = (username) => {
    //returns boolean
    //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
    //returns boolean
    //write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post("/login", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});
