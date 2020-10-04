const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");

//route
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`listening on port ${PORT}`));

//custom modules
const dbControllers = require("./controllers/dbControllers");
const pgControllers = require("./controllers/pgControllers");
const customModules = require("./controllers/customModules");

//db
mongoose.connect(
  "mongodb+srv://aidenhsy:Bob42802@rest.apiyh.mongodb.net/testxx",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//global variable
global.loggedIn = null;

//middlewares
app.use(express.static("public"));
app.use(fileUpload());
app.use(expressSession({ secret: "greasy" }));
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
app.set("view engine", "ejs");

//gets
app.get("/", pgControllers.home);
app.get("/auth/register", pgControllers.createUser);
app.get("/auth/login", pgControllers.loginUser);
app.get("/user/logout", customModules.logoutUser);

//posts
app.post("/user/store", dbControllers.storeUser);
app.post("/user/login", customModules.loginUser);
