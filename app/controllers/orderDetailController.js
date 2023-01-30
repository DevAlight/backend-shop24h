// Import thư viện Mongoose
const mongoose = require("mongoose");

// Import Module Course Model
const orderModel = require("../models/orderModel");
const orderDetailModel = require("../models/orderDetailModel");

//const post new createCustomer
const createOrderDetailOfOrder = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    const orderId = req.params.orderId;
    const body = req.body;
    // B2: Validate dữ liệu
    // Kiểm tra product
    
    if (!body.products) {
        return res.status(400).json({
            status: "Bad Request",
            message: "products không hợp lệ"
        })
    }    
    // B3: Gọi Model tạo dữ liệu
    const newOrder = {
        _id: mongoose.Types.ObjectId(),
        products: body.products       
    }
    orderDetailModel.create(newOrder, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        // Thêm ID của oder mới vào mảng orders của Customer đã chọn
        orderModel.findByIdAndUpdate(orderId, {
            $push: {
                orderDetails: data._id
            }
        }, (err, updatedCourse) => {
            if (err) {
                return res.status(500).json({
                    status: "Internal server error",
                    message: err.message
                })
            }

            return res.status(201).json({
                status: "Create orderDetail Successfully",
                data: data
            })
        })
    })
}
//const getAllCustomer
//////
const getAllOrderDetail = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệu
    orderDetailModel.find((error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        //neu chay ok
        return res.status(200).json({
            status: "Get all OrderDetail",
            data: data
        })

    })
}
////////
//const getAllOrderOfCustomer
const getAllOrderDetailOfOrder = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let orderId = req.params.orderId;
    // B2: Validate dữ liệu
    // Kiểm tra Title
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
            status: "Bad Request",
            message: "productByID không hợp lệ"
        })
    }
    // B3: Thao tác với cơ sở dữ liệu
    orderModel.findById(orderId)
        .populate("orderDetails")
        .exec((error, data) => {
            if (error) {
                return res.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }

            return res.status(200).json({
                status: "Get all OrderDetail of Order successfully",
                data: data
            })
        })
}
//const getOrderById
const getOrderDetailById = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let orderDetailId = req.params.orderDetailId;
    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderDetailId)) {
        return req.status(400).json({
            status: "Bad Request",
            message: "OrderId không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    orderDetailModel.findById(orderDetailId, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return res.status(200).json({
            status: "Get orderDetail order successfully",
            data: data
        })
    })
}
//const updateCustomer theo id
const updateOrderDetail = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let orderDetailId = req.params.orderDetailId;
    let body = req.body;
    // B2: Validate dữ liệu
    //check luon co id ko
    if (!mongoose.Types.ObjectId.isValid(orderDetailId)) {
        return res.status(400).json({
            status: "Bad Request",
            message: "orderDetailId không hợp lệ"
        })
    }
    // Kiểm tra product
    if (!body.product) {
        return res.status(400).json({
            status: "Bad Request",
            message: "product không hợp lệ"
        })
    }
    // Kiểm tra quantity
    if (!body.quantity) {
        return res.status(400).json({
            status: "Bad Request",
            message: "quantity không hợp lệ"
        })
    }
    // B3: Gọi Model tạo dữ liệu
    const updateNew = {}

    if (body.product !== undefined) {
        updateNew.product = body.product
    }
    if (body.quantity !== undefined) {
        updateNew.quantity = body.quantity
    }
    //ok het thi lam thoi
    orderDetailModel.findByIdAndUpdate(orderDetailId, updateNew, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return res.status(200).json({
            status: "Update orderDetail successfully",
            data: updateNew
        })
    })
}
//Ham deleteOrder
const eleteOrderDetail = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let orderDetailId = req.params.orderDetailId;
    let orderId = req.params.orderId;
    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderDetailId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "orderDetail ID không hợp lệ"
        })
    }
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Order ID không hợp lệ"
        })
    }
    // B3: Gọi Model tạo dữ liệu
    orderDetailModel.findByIdAndDelete(orderDetailId, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        orderModel.findByIdAndUpdate(orderId, {
            $pull: { orders: orderId }
        }, (err, updatedNew) => {
            if (err) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: err.message
                })
            }
    
            return res.status(200).json({
                status: "Delete orderDetail successfully"
            })
        })
    })
}
module.exports = {
    createOrderDetailOfOrder,
    getAllOrderDetail,
    getAllOrderDetailOfOrder,
    getOrderDetailById,
    updateOrderDetail,
    eleteOrderDetail
}