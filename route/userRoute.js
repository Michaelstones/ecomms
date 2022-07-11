const express = require("express");
const route = express.Router();
const userContrl = require("../controllers/userCntrl");
const auth = require("../middlewares/auth");

route.post("/register", userContrl.register);
route.post("/login", userContrl.login);
route.get("/logout", userContrl.logout);
route.get("/refresh_token", userContrl.refreshToken);
route.get("/auth", auth, userContrl.getUser);
route.patch("/addcart", auth, userContrl.addCart);
route.get("/history", auth, userContrl.history);

module.exports = route;
