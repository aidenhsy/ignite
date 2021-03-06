const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  password: String,
});
UserSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
