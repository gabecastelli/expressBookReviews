import express from "express";
import jwt from "jsonwebtoken";
import session from "express-session";
import { users, regd_users as customer_routes } from "./router/auth_users.js";
import { public_users as genl_routes } from "./router/general.js";

const PORT = 5001;

const app = express();

app.use(
    "/customer",
    session({
        secret: "fingerprint_customer",
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);

app.use(express.json());

app.use((req, res, next) => {
    console.log("Middleware Check - Session:", req.session);
    next();
});

app.use("/customer/auth/*", (req, res, next) => {
    if (!req.session.authorization) {
        return res.status(403).send("User not logged in.");
    }

    const token = req.session.authorization["accessToken"];

    jwt.verify(token, "access", (err, user) => {
        if (err) {
            return res.status(403).send("User not authenticated.");
        }

        req.user = user;
        next();
    })
});

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));

function userIsAuthenticated(username, password) {
    return users.some(
        (user) => user.username === username && user.passowrd === password
    );
}
