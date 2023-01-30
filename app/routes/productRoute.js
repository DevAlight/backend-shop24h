// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const product = express.Router();

// Import course middleware
//const courseMiddleware = require("../middlewares/courseMiddleware");

// Import course controller
const productController = require("../controllers/productController")

product.post("/products", productController.createProduct);

product.get("/products", productController.getAllProduct);

product.get("/products-limit", productController.getLimitProduct);

product.get("/products-filter", productController.getFilterProduct);

product.get("/products/:productId", productController.getProductByID);

product.put("/products/:productId", productController.updateProduct);

product.delete("/products/:productId", productController.deleteProduct);

module.exports = product;