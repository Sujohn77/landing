const express = require("express");
const routes = express.Router();

const verifyToken = require("./verifyToken");

const loginController = require("./controllers/login");
const registerController = require("./controllers/register");
const mainController = require("./controllers/main");

routes.post("/login", loginController.login);

routes.post("/login/auth", verifyToken, loginController.checkAuth);

routes.post("/registerMe", registerController.registerMe);

routes.get("/", mainController.mainPage);

module.exports = routes ;