const User = require("../Schemas/Users");
const { hashPassword, comparePasswords } = require("../utils/passwordHelper");
const { generateToken } = require("../utils/tokenHelper");

exports.getLogin = (req, res) => {
    res.render("login", { title: "Login" });
}

exports.postLogin = async (req, res, next) => {
    try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                return res.status(400).render("login", {
                    title: "Login",
                    error: "Please fill in both fields."
                });
            }
    
            // find the user by their email
            const user = await User.findOne({ Email: email });
            if (!user) {
                return res.status(401).render("login", {
                    title: "Login",
                    error: "Invalid email or password."
                });
            }
    
            // run the plain text password against the stored hash
            const passwordMatch = await comparePasswords(password, user.Password);
            if (!passwordMatch) {
                return res.status(401).render("login", {
                    title: "Login",
                    error: "Invalid email or password."
                });
            }
    
            // credentials are good - mint a token and drop it in a cookie
            generateToken(res, user);
            res.redirect("/");
    
        } catch (err) {
            next(err);
        }
}

exports.getRegister = (req, res) => {
    res.render("register", { title: "Register" });
}

exports.postRegister = async (req, res, next) => {
    try {
            const { name, email, password, confirmPassword } = req.body;
    
            if (!name || !email || !password) {
                return res.status(400).render("register", {
                    title: "Register",
                    error: "All fields are required."
                });
            }

            if (password !== confirmPassword) {
            return res.status(400).render("register", {
                title: "Register",
                error: "Passwords do not match."
            });
        }
    
            // don't let someone register with an email that already exists
            const existing = await User.findOne({ Email: email });
            if (existing) {
                return res.status(409).render("register", {
                    title: "Register",
                    error: "An account with that email already exists."
                });
            }
    
            // hash before saving - never store plain text passwords
            const hashed = await hashPassword(password);
    
            const newUser = await User.create({
                Name:     name,
                Email:    email,
                Password: hashed,
                Role:     "user"    // everyone starts as a standard user
            });
    
            // log them straight in after registering
            generateToken(res, newUser);
            res.redirect("/");
    
        } catch (err) {
            next(err);
        }
}

exports.getLogout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/auth/login");
}