// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const user = express.Router();

// Import course middleware
//onst courseMiddleware = require("../middlewares/courseMiddleware");

// Import course controller
const userController = require("../controllers/userController")

user.post("/user", userController.createUser);

// user.get("/customers", customerController.getAllCustomer);

// user.get("/customers/:customerId", customerController.getCustomerByID);

// user.put("/customers/:customerId", customerController.updateCustomer);

// user.delete("/customers/:customerId", customerController.deleteCustomer);

module.exports = user;