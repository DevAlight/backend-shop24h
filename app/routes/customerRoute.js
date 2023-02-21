// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const customer = express.Router();

// Import course middleware
const customerMiddleware = require("../middlewares/customerMiddleware");

// Import course controller
const customerController = require("../controllers/customerController")

customer.post("/customers", customerController.createCustomer);

customer.get("/customers",customerMiddleware.customerGETALL, customerController.getAllCustomer);

customer.get("/customersEmail", customerController.getCustomerEmail);

customer.get("/customers/:customerId", customerController.getCustomerByID);

customer.put("/customers/:customerId",customerMiddleware.customerPUT, customerController.updateCustomer);

customer.delete("/customers/:customerId",customerMiddleware.customerDEL, customerController.deleteCustomer);

module.exports = customer;