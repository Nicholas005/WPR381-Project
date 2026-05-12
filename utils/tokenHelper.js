const jwt = require("jsonwebtoken");

// user stays logged in for a week unless they log out
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

// builds the JWT payload from the user document and sets the cookie on the response
const generateToken = (res, user) => {
    const payload = {
        id:   user._id,
        name: user.Name,
        role: user.Role,
        email: user.Email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    // httpOnly stops JavaScript from reading the cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: COOKIE_MAX_AGE
    });
};

module.exports = { generateToken };