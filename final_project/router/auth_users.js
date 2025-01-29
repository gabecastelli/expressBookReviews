import express from "express";
import session from "express-session";
import jwt from "jsonwebtoken";
import books from "./booksdb.js";

export const regd_users = express.Router();
regd_users.use(express.json());

export let users = [];

export function isValid(username) {
    return users.some((user) => user.username === username);
}

function userIsAuthenticated(username, password) {
    return users.some(
        (user) => user.username === username && user.password === password
    );
}

// Only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Missing username or password.");
    }

    if (!userIsAuthenticated(username, password)) {
        return res.status(401).send("Invalid credentials.");
    }

    // Generate token
    let accessToken = jwt.sign(
        {
            data: password
        },
        "access",
        { expiresIn: 60 * 60 }
    );

    // Store token and username in session
    req.session.authorization = {
        accessToken,
        username,
    };

    return res.status(200).send(`User ${username} logged in successfully.`);
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const matchingBook = books[isbn];
    const username = req.session.authorization.username;
    const existingReview = matchingBook.reviews[username];

    if (!isbn) {
        return res.status(400).send("Bad request, missing ISBN.");
    }

    if (!review) {
        return res.status(400).send("Bad request, missing review.");
    }

    if (!matchingBook) {
        return res.status(404).send(`Book with ISBN ${isbn} not found.`);
    }

    matchingBook.reviews[username] = review;

    return res
        .status(200)
        .send(
            `Review for book with ISBN ${isbn} ${
                existingReview ? "updated" : "added"
            } for ${username}.`
        );
});
