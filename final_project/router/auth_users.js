import express from "express";
import session from "express-session";
import jwt from "jsonwebtoken";
import books from "./booksdb.js";

export const regd_users = express.Router();
regd_users.use(express.json());
regd_users.use(session({
        secret: "fingerprint_customer",
        resave: true,
        saveUninitialized: true,
    })
);

export let users = [];

export function isValid(username) {
    return !users.some((user) => user.username === username);
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
            data: password,
        },
        "access",
        { expiresIn: 60 * 60 }
    );

    // Store token and username in session
    req.session.authorization = {
        accessToken, username
    };

    return res.status(200).send(`User ${username} logged in successfuly.`);
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    // Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});
