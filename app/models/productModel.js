// Khai báo thư viên mongooseJS
const mongoose = require("mongoose");

// Khai báo Class Schema
const Schema = mongoose.Schema;

// Khởi tạo 1 instance productSchema từ class Schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true
    },
    promotionPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})



module.exports = mongoose.model("Product", productSchema);