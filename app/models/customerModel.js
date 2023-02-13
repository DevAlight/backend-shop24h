// Khai báo thư viên mongooseJS
const mongoose = require("mongoose");

// Khai báo Class Schema
const Schema = mongoose.Schema;

// Khởi tạo 1 instance productSchema từ class Schema
const customerSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    orders: [{
        order: {
            type: mongoose.Types.ObjectId,
            ref: "Order"
        },
        orderCode: {
           /////
        },
    }]
}, {
    timestamps: true
})



module.exports = mongoose.model("Customer", customerSchema);