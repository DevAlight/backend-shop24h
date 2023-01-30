// Khai báo thư viên mongooseJS
const mongoose = require("mongoose");

// Khai báo Class Schema
const Schema = mongoose.Schema;

// Khởi tạo 1 instance productSchema từ class Schema
const orderDetailSchema = new Schema({
    products: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            default: 0
        }
    }]
}, {
    timestamps: true
})



module.exports = mongoose.model("OrderDetail", orderDetailSchema);