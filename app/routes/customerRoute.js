// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const customer = express.Router();

// Import course middleware
//onst courseMiddleware = require("../middlewares/courseMiddleware");

// Import course controller
const customerController = require("../controllers/customerController")

customer.post("/customers", customerController.createCustomer);

customer.get("/customers", customerController.getAllCustomer);

customer.get("/customers/:customerId", customerController.getCustomerByID);

customer.put("/customers/:customerId", customerController.updateCustomer);

customer.delete("/customers/:customerId", customerController.deleteCustomer);

module.exports = customer;