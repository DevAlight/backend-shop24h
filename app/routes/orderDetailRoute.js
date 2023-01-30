// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const orderDetail = express.Router();

// Import course middleware
//onst courseMiddleware = require("../middlewares/courseMiddleware");

// Import course controller
const orderDetailController = require("../controllers/orderDetailController")

orderDetail.post("/orders/:orderId/orderDetails", orderDetailController.createOrderDetailOfOrder);

orderDetail.get("/orders/:orderId/orderDetails", orderDetailController.getAllOrderDetailOfOrder);

orderDetail.get("/orderDetails/:orderDetailId", orderDetailController.getOrderDetailById);

orderDetail.get("/orderDetails", orderDetailController.getAllOrderDetail);

orderDetail.put("/orderDetails/:orderDetailId", orderDetailController.updateOrderDetail);

orderDetail.delete("/orders/:orderId/orderDetails/:orderDetailId", orderDetailController.eleteOrderDetail);

module.exports = orderDetail;