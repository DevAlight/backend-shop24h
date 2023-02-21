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
    email: {
        type: String,
        required: true
    },
    shippedDate: {
        type: Date
    },
    note: {
        type: String
    },
    orderDetails: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        },
        name: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        promotionPrice: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            default: 0
        }
    }],
    cost: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'open'
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
