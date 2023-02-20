// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const product = express.Router();

// Import course middleware
const productMiddleware = require("../middlewares/productMiddleware");

// Import course controller
const productController = require("../controllers/productController")

product.post("/products", productController.createProduct);

product.get("/products", productController.getAllProduct);

product.get("/products-limit", productController.getLimitProduct);

product.get("/products-filter", productController.getFilterProduct);

product.get("/products/:productId", productController.getProductByID);

product.put("/products/:productId",productMiddleware.authMiddlewarePUT, productController.updateProduct);

product.delete("/products/:productId",productMiddleware.authMiddlewareDEL, productController.deleteProduct);

module.exports = product;