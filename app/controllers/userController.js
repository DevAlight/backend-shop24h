// Import thư viện Mongoose
const mongoose = require("mongoose");

// Import Module Course Model
const userModel = require("../models/userModel");

//const post new createCustomer
const createUser = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    const body = req.body;
    // B2: Validate dữ liệu
    // Kiểm tra user
    if (!body.user) {
        return res.status(400).json({
            status: "Bad Request",
            message: "user không hợp lệ"
        })
    }
    // Kiểm tra role
    if (!body.role) {
        return res.status(400).json({
            status: "Bad Request",
            message: "password không hợp lệ"
        })
    }
    // B3: Gọi Model tạo dữ liệu
    const newUser = {
        _id: mongoose.Types.ObjectId(),
        user: body.user,
        role: body.role
    }
    userModel.create(newUser, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return res.status(201).json({
            status: "Create  newUser successfully",
            data: data
        })
    })
}
//const getAllCustomer
const getAllUser = (req, res) => {    
    const user = req.query.user;    
    console.log(user);
    // B1: Chuẩn bị dữ liệu
    // B2: Validate dữ liệu
    if (user) {
        userModel.findOne({user:user})            
            .exec((error, data) => {
                if (error) {
                    return res.status(500).json({
                        status: "Internal server error",
                        message: error.message
                    })
                }
                //neu chay ok
                return res.status(200).json({
                    status: "Get User with Emaill",
                    data: data
                })

            })
    }
    else {
        // B3: Gọi Model tạo dữ liệu
        userModel.find((error, data) => {
            if (error) {
                return res.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
            //neu chay ok
            return res.status(200).json({
                status: "Get all Customer",
                data: data
            })
        })

    }
}
//const getUserByID
const getUserByID = (req, res) => {   
    // B1: Chuẩn bị dữ liệu
    let userId = req.params.userId;
    // B2: Validate dữ liệu
    // Kiểm tra Title
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            status: "Bad Request",
            message: "userId không hợp lệ"
        })
    }
    // B3: Gọi Model tạo dữ liệu
    userModel.findById(userId, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        //neu tim dc
        return res.status(200).json({
            status: "Get detail User successfully",
            data: data
        })
    })

}
//const updateCustomer theo id
const updateCustomer = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let customerId = req.params.customerId;
    let body = req.body;
    // B2: Validate dữ liệu
    //check luon co id ko
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).json({
            status: "Bad Request",
            message: "productTypeByID không hợp lệ"
        })
    }
    // Kiểm tra fullName
    if (!body.fullName) {
        return res.status(400).json({
            status: "Bad Request",
            message: "fullName không hợp lệ"
        })
    }
    // Kiểm tra phone
    if (!body.phone) {
        return res.status(400).json({
            status: "Bad Request",
            message: "phone không hợp lệ"
        })
    }
    // Kiểm tra email
    if (!body.email) {
        return res.status(400).json({
            status: "Bad Request",
            message: "email không hợp lệ"
        })
    }
    // Kiểm tra address
    if (!body.address) {
        return res.status(400).json({
            status: "Bad Request",
            message: "address không hợp lệ"
        })
    }
    // Kiểm tra city
    if (!body.city) {
        return res.status(400).json({
            status: "Bad Request",
            message: "city không hợp lệ"
        })
    }
    // Kiểm tra country
    if (!body.country) {
        return res.status(400).json({
            status: "Bad Request",
            message: "country không hợp lệ"
        })
    }
    // B3: Gọi Model tạo dữ liệu
    const updateNew = {}

    if (body.fullName !== undefined) {
        updateNew.fullName = body.fullName
    }
    if (body.phone !== undefined) {
        updateNew.phone = body.phone
    }
    if (body.email !== undefined) {
        updateNew.email = body.email
    }
    if (body.address !== undefined) {
        updateNew.address = body.address
    }
    if (body.city !== undefined) {
        updateNew.city = body.city
    }
    if (body.country !== undefined) {
        updateNew.country = body.country
    }
    //ok het thi lam thoi
    userModel.findByIdAndUpdate(customerId, updateNew, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return res.status(200).json({
            status: "Update Customer successfully",
            data: updateNew
        })
    })
}
//Ham xoa
const deleteCustomer = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let customerId = req.params.customerId;
    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Customer ID không hợp lệ"
        })
    }
    // B3: Gọi Model tạo dữ liệu
    userModel.findByIdAndDelete(customerId, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return res.status(200).json({
            status: "Delete Customer successfully"
        })
    })
}
module.exports = {
    createUser,
    getAllUser,
    getUserByID,
    updateCustomer,
    deleteCustomer
}