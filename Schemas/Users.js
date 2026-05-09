const mongoose = require("mongoose");
const { type } = require("node:os");

const UserSchema = new mongoose.Schema({
  Name:  { type: String, required: true },
  Email: { type: String, required: true },
  Role:  { type: String, required: true },
  Password: {type: String, Required: true }
});

module.exports = mongoose.model("Users", UserSchema);

/*
import as
const User = require('./Schemas/Users');

queried as:
const allUsers = await User.find();
*/