// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const user = express.Router();

// Import course middleware
//onst courseMiddleware = require("../middlewares/courseMiddleware");

// Import course controller
const userController = require("../controllers/userController")

user.post("/users", userController.createUser);

user.get("/users", userController.getAllUser);

user.get("/users/:userId", userController.getUserByID);

user.put("/users/:userId", userController.updateUser);

user.delete("/users/:userId", userController.deleteUser);

module.exports = user;