const User = require("../../models/User");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const { username, password } = req.body;
  await User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          res.redirect("/");
        } else {
          res.redirect("/auth/login");
        }
      });
    } else {
      res.redirect("/auth/login");
    }
  });
};
