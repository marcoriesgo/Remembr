//Start dependencies:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create the user schema:
const userSchema = Schema({
  username: String,
  password: String
});

//Create the user model:
const User = mongoose.model("User", userSchema);

//Export model for use in controllers:
module.exports = User;