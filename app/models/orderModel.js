const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderDate: {
        type: Date,
        default: Date.now()
    },
    orderCode: {
        type: String,
        unique: true        
    },
    shippedDate: {
        type: Date
    },
    note: {
        type: String
    },
    orderDetails: [{
        type: mongoose.Types.ObjectId,
        ref: "OrderDetail",
    }],
    cost: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Generate a unique order code before saving the order
orderSchema.pre("save", async function (next) {
    const order = this;
    if (!order.orderCode) {
        // Generate a random order code of 5 characters
        const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let orderCode = "";
        for (let i = 0; i < 5; i++) {
            orderCode += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
        }
        // Check for the existence of the order code in the database
        let existingOrder = await Order.findOne({ orderCode });
        while (existingOrder) {
            orderCode = "";
            for (let i = 0; i < 5; i++) {
                orderCode += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            }
            existingOrder = await Order.findOne({ orderCode });
        }
        order.orderCode = orderCode;
    }
    next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
