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

// user.put("/customers/:customerId", userController.updateCustomer);

// user.delete("/customers/:customerId", userController.deleteCustomer);

module.exports = user;