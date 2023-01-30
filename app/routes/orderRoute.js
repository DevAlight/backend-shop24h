// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const order = express.Router();

// Import course middleware
//onst courseMiddleware = require("../middlewares/courseMiddleware");

// Import course controller
const orderController = require("../controllers/orderController")

order.post("/customers/:customerId/orders", orderController.createOrder);

order.get("/orders", orderController.getAllOrder);

order.get("/orders/:orderId", orderController.getOrderById);

order.get("/customers/:customerId/orders", orderController.getAllOrderOfCustomer);

order.put("/orders/:orderId", orderController.updateOrderById);

order.delete("/customers/:customerId/orders/:orderId", orderController.deleteOrder);

module.exports = order;