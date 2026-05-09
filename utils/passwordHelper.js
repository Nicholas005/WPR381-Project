const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const hashPassword = async (plainText) => {
    return await bcrypt.hash(plainText, SALT_ROUNDS);
};

const comparePasswords = async (plainText, hashed) => {
    return await bcrypt.compare(plainText, hashed);
};

module.exports = { hashPassword, comparePasswords };

/*
import in authController.js like this:
const { hashPassword, comparePasswords } = require("../utils/passwordHelper");

on register:
    user.Password = await hashPassword(req.body.password);

on login:
    const match = await comparePasswords(req.body.password, user.Password);
    if (!match) return res.status(401).send("Wrong password");
*/
