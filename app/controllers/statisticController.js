// Import thư viện Mongoose
const mongoose = require("mongoose");
// Import Module Course Model
const orderModel = require("../models/orderModel");
const customerModel = require("../models/customerModel");
const productModel = require("../models/productModel");
exports.getNumberOfCustomers = async (req, res) => {
    try {
        const totalCustomers = await customerModel.distinct("customerId").countDocuments();
        res.json({ totalCustomers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Hàm tính tổng cost của tất cả các order
exports.getTotalCost = async (req, res) => {
    try {
        const totalCost = await orderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalCost: { $sum: "$cost" }
                }
            }
        ]);
        res.json({ totalCost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Hàm tính tổng cost trong 6 ngày gần nhất
exports.getCostIn6Days = async (req, res) => {
    try {
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - 6 * 24 * 60 * 60 * 1000);
      const costIn6Days = await orderModel.aggregate([
        {
          $match: {
            orderDate: { $gte: startDate, $lt: endDate }
          }
        },
        {
          $group: {
            _id: {$dayOfWeek: "$orderDate"},
            totalCost: { $sum: "$cost" }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
      const result = [{
        name: "Total",
        data: costIn6Days.map(d => d.totalCost)
      }];
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
 //Hàm đếm số produc còn lại
 exports.getTotalProducts = async (req, res) => {
  try {   
    const totalProducts = await productModel.countDocuments();
    res.json({ totalProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//đêm order
exports.getAllTotalOrder = async (req, res) => {
  try {
      const totalOrders = await orderModel.countDocuments();
      res.json({ totalOrders });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
