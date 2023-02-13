// Khai báo thư viện ExpressJS
const express = require("express");
// Khai báo router app
const statistic = express.Router();

// Import statistic controller
const statisticController = require("../controllers/statisticController");

statistic.get("/statistic/orders/cost", statisticController.getTotalCost);
statistic.get("/statistic/orders/cost/6days", statisticController.getCostIn6Days);
statistic.get("/statistic/orders/total", statisticController.getAllTotalOrder);
statistic.get("/statistic/customers", statisticController.getNumberOfCustomers);
//đếm products
statistic.get("/statistic/products/total", statisticController.getTotalProducts);

module.exports = statistic;
