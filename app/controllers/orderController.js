
// Import thư viện Mongoose
const mongoose = require("mongoose");

// Import Module Course Model
const orderModel = require("../models/orderModel");
const customerModel = require("../models/customerModel");

//const post new createCustomer
const createOrder = (req, res) => {
    debugger;
    // B1: Chuẩn bị dữ liệu
    const customerId = req.params.customerId;
    const body = req.body;
    // B2: Validate dữ liệu
    // Kiểm tra shippedDate
    // if (!body.shippedDate) {
    //     return res.status(400).json({
    //         status: "Bad Request",
    //         message: "shippedDate không hợp lệ"
    //     })
    // }
    // Kiểm tra note
    if (!body.note) {
        return res.status(400).json({
            status: "Bad Request",
            message: "note không hợp lệ"
        })
    }
    // Kiểm tra cost
    if (!body.cost) {
        return res.status(400).json({
            status: "Bad Request",
            message: "cost không hợp lệ"
        })
    }
    // B3: Gọi Model tạo dữ liệu
    const newOrder = {
        _id: mongoose.Types.ObjectId(),
        // shippedDate: body.shippedDate, 
        orderDetails: body.orderDetails,
        email: body.email,
        note: body.note,
        cost: body.cost
    }
    orderModel.create(newOrder, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        // Thêm ID của oder mới vào mảng orders của Customer đã chọn
        customerModel.findByIdAndUpdate(customerId, {
            $push: {
                orders: { oder: data._id, orderCode: data.orderCode }
            }
        }, (err, updatedCourse) => {
            if (err) {
                return res.status(500).json({
                    status: "Internal server error",
                    message: err.message
                })
            }

            return res.status(201).json({
                status: "Create Order Successfully",
                data: data
            })
        })
    })
}
//const getAllCustomer
const getAllOrder = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệu
    orderModel.find((error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        //neu chay ok
        return res.status(200).json({
            status: "Get all Orders",
            data: data
        })

    })
}
//const getFilterOrder
const getFilterOrder = (req, res) => {
    let skip = req.query.skip
    let limit = req.query.limit;
    let codeQuery = req.query.orderCode;
    let statusQuery = req.query.status;
    let dateStartQuery = req.query.dateStart;       
    // B1: Chuẩn bị dữ liệu
    let dataFilter = {
    };
    if (codeQuery) {
        dataFilter.orderCode = { '$regex': codeQuery, '$options': 'i' };
    }
    if (statusQuery != 'none') {
        dataFilter.status = { '$regex': statusQuery, '$options': 'i' };
    }
    if (dateStartQuery !='undefined'&&dateStartQuery) {
        dataFilter.orderDate = { $gte: dateStartQuery };
    }
   
  
    // B2: Validate dữ liệu   
    if (limit) {
        // B3: Gọi Model tạo dữ liệu
        orderModel.find(dataFilter)
            .skip(skip)
            .limit(limit)
            .exec((error, data) => {
                if (error) {
                    return res.status(500).json({
                        status: "Internal server error",
                        message: error.message
                    })
                }
                //neu chay ok
                return res.status(200).json({
                    status: "Get all Order",
                    data: data
                })

            })
    }
    else {
        // B3: Gọi Model tạo dữ liệu
        orderModel.find(dataFilter)
            .exec((error, data) => {
                if (error) {
                    return res.status(500).json({
                        status: "Internal server error",
                        message: error.message
                    })
                }
                //neu chay ok
                return res.status(200).json({
                    status: "Get all Product2",
                    data: data
                })

            })
    }

}
//const getAllOrderOfCustomer
const getAllOrderOfCustomer = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let customerId = req.params.customerId;
    // B2: Validate dữ liệu
    // Kiểm tra Title
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).json({
            status: "Bad Request",
            message: "productByID không hợp lệ"
        })
    }
    // B3: Thao tác với cơ sở dữ liệu
    customerModel.findById(customerId)
        .populate("orders")
        .exec((error, data) => {
            if (error) {
                return res.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }

            return res.status(200).json({
                status: "Get all order of Customer successfully",
                data: data
            })
        })
}
//const getOrderById
const getOrderById = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let orderId = req.params.orderId;
    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return req.status(400).json({
            status: "Bad Request",
            message: "OrderId không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    orderModel.findById(orderId, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return res.status(200).json({
            status: "Get detail order successfully",
            data: data
        })
    })
}
//const updateCustomer theo id
const updateOrderById = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let orderId = req.params.orderId;
    let body = req.body;
    // B2: Validate dữ liệu
    //check luon co id ko
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
            status: "Bad Request",
            message: "productTypeByID không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const updateNew = {}
    if (body.email !== undefined) {
        updateNew.email = body.email
    }
    if (body.shippedDate !== undefined) {
        updateNew.shippedDate = body.shippedDate
    }
    if (body.note !== undefined) {
        updateNew.note = body.note
    }
    if (body.orderDetails !== undefined) {
        updateNew.orderDetails = body.orderDetails
    }
    if (body.cost !== undefined) {
        updateNew.cost = body.cost
    }
    if (body.status !== undefined) {
        updateNew.status = body.status
    }
    //ok het thi lam thoi
    orderModel.findByIdAndUpdate(orderId, updateNew, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return res.status(200).json({
            status: "Update Order successfully",
            data: updateNew
        })
    })
}
//Ham deleteOrder
const deleteOrder = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let customerId = req.params.customerId;
    let orderId = req.params.orderId;
    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Customer ID không hợp lệ"
        })
    }
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Order ID không hợp lệ"
        })
    }
    // B3: Gọi Model tạo dữ liệu
    orderModel.findByIdAndDelete(orderId, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        customerModel.findByIdAndUpdate(customerId, {
            $pull: { orders: orderId }
        }, (err, updatedNew) => {
            if (err) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: err.message
                })
            }

            return res.status(200).json({
                status: "Delete order successfully"
            })
        })
    })
}

module.exports = {
    createOrder,
    getAllOrder,
    getAllOrderOfCustomer,
    getFilterOrder,
    getOrderById,
    updateOrderById,
    deleteOrder
}