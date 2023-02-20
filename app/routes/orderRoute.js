// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const order = express.Router();

// Import course middleware
const orderMiddleware = require("../middlewares/orderMiddleware");

// Import course controller
const orderController = require("../controllers/orderController")

order.post("/customers/:customerId/orders", orderController.createOrder);

order.get("/orders",orderMiddleware.orderMiddlewareGETALL, orderController.getAllOrder);

order.get("/orders-filter",orderMiddleware.orderMiddlewareGETALL, orderController.getFilterOrder);

order.get("/orders/:orderId", orderController.getOrderById);

order.get("/customers/:customerId/orders", orderController.getAllOrderOfCustomer);

order.put("/orders/:orderId",orderMiddleware.orderMiddlewarePUT, orderController.updateOrderById);

order.delete("/customers/:customerId/orders/:orderId",orderMiddleware.orderMiddlewareDEL, orderController.deleteOrder);

module.exports = order;