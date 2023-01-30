// Import thư viện Mongoose
const mongoose = require("mongoose");

// Import Module Course Model
const productModel = require("../models/productModel");

//const post new productype
const createProduct = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    const body = req.body;
    // B2: Validate dữ liệu
    // Kiểm tra name
    if (!body.name) {
        return res.status(400).json({
            status: "Bad Request",
            message: "name không hợp lệ"
        })
    }
    // Kiểm tra name
    if (!body.description) {
        return res.status(400).json({
            status: "Bad Request",
            message: "description không hợp lệ"
        })
    }
    // Kiểm tra type
    if (!body.type) {
        return res.status(400).json({
            status: "Bad Request",
            message: "type không hợp lệ"
        })
    }
    // Kiểm tra imageUrl
    if (!body.imageUrl) {
        return res.status(400).json({
            status: "Bad Request",
            message: "imageUrl không hợp lệ"
        })
    }
    // Kiểm tra buyPrice
    if (!body.buyPrice) {
        return res.status(400).json({
            status: "Bad Request",
            message: "buyPrice không hợp lệ"
        })
    }
    // Kiểm tra promotionPrice
    if (!body.promotionPrice) {
        return res.status(400).json({
            status: "Bad Request",
            message: "promotionPrice không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const newpPoduct = {
        _id: mongoose.Types.ObjectId(),
        name: body.name,
        description: body.description,
        type: body.type,
        imageUrl: body.imageUrl,
        buyPrice: body.buyPrice,
        promotionPrice: body.promotionPrice,
    }
    productModel.create(newpPoduct, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return res.status(201).json({
            status: "Create Poduct successfully",
            data: data
        })
    })
}
//const getAllProductType
const getAllProduct = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let skip = req.query.skip
    let limit = req.query.limit;
    // B2: Validate dữ liệu   
    if (limit) {
        // B3: Gọi Model tạo dữ liệu
        productModel.find()
            .limit(limit)
            .skip(skip)
            .exec((error, data) => {
                if (error) {
                    return res.status(500).json({
                        status: "Internal server error",
                        message: error.message
                    })
                }
                //neu chay ok
                return res.status(200).json({
                    status: "Get all Product",
                    data: data
                })

            })
    }
    else {
        // B3: Gọi Model tạo dữ liệu
        productModel.find((error, data) => {
            if (error) {
                return res.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
            //neu chay ok
            return res.status(200).json({
                status: "Get all Product",
                data: data
            })

        })
    }

}
//const getFilterProduct
const getFilterProduct = (req, res) => {
    let skip = req.query.skip
    let limit = req.query.limit;
    let nameQuery = req.query.name.trim();
    let typeQuery = req.query.type;
    let minPriceQuery = 0;
    let maxPriceQuery = 1000000;
    if (req.query.minPrice) {
        minPriceQuery = parseInt(req.query.minPrice);
    }
    if (req.query.maxPrice) {
        maxPriceQuery = parseInt(req.query.maxPrice);
    }
    // B1: Chuẩn bị dữ liệu
    let dataFilter = {        
        promotionPrice: { '$gt': minPriceQuery, '$lt': maxPriceQuery }
    };
    if (nameQuery) {
        dataFilter.name = { '$regex': nameQuery, '$options': 'i' };
    }
    if (typeQuery != 'none') {
        dataFilter.type = { '$regex': typeQuery, '$options': 'i' };
    }
    // B2: Validate dữ liệu   
    if (limit) {
        // B3: Gọi Model tạo dữ liệu
        productModel.find(dataFilter)
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
                    status: "Get all Product",
                    data: data
                })

            })
    }
    else {
        // B3: Gọi Model tạo dữ liệu
        productModel.find(dataFilter)
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
//const getLimitProduct
const getLimitProduct = (req, res) => {
    // B1: Chuẩn bị dữ liệu    
    let limit = req.query.limit;
    let typeFilter = req.query.type;
    // B2: Validate dữ liệu   
    if (typeFilter) {
        productModel.find()
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
                    status: "Get all Product",
                    data: data.filter(data => data.type.includes(typeFilter))
                })

            })
    }
    else {
        // B3: Gọi Model tạo dữ liệu
        productModel.find((error, data) => {
            if (error) {
                return res.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
            //neu chay ok
            return res.status(200).json({
                status: "Get all Product",
                data: data
            })

        })
    }

}
//const getProductTypeByID
const getProductByID = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let productId = req.params.productId;
    // B2: Validate dữ liệu
    // Kiểm tra Title
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            status: "Bad Request",
            message: "productByID không hợp lệ"
        })
    }
    // B3: Gọi Model tạo dữ liệu
    productModel.findById(productId, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        //neu tim dc
        return res.status(200).json({
            status: "Get detail ProductType successfully",
            data: data
        })
    })
}
//const ham put theo id
const updateProduct = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let productId = req.params.productId;
    let body = req.body;
    // B2: Validate dữ liệu
    //check luon co id ko
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            status: "Bad Request",
            message: "productTypeByID không hợp lệ"
        })
    }
    // Kiểm tra name
    if (!body.name) {
        return res.status(400).json({
            status: "Bad Request",
            message: "name không hợp lệ"
        })
    }
    // Kiểm tra name
    if (!body.description) {
        return res.status(400).json({
            status: "Bad Request",
            message: "description không hợp lệ"
        })
    }
    // Kiểm tra type
    if (!body.type) {
        return res.status(400).json({
            status: "Bad Request",
            message: "type không hợp lệ"
        })
    }
    // Kiểm tra imageUrl
    if (!body.imageUrl) {
        return res.status(400).json({
            status: "Bad Request",
            message: "imageUrl không hợp lệ"
        })
    }
    // Kiểm tra buyPrice
    if (!body.buyPrice) {
        return res.status(400).json({
            status: "Bad Request",
            message: "buyPrice không hợp lệ"
        })
    }
    // Kiểm tra promotionPrice
    if (!body.promotionPrice) {
        return res.status(400).json({
            status: "Bad Request",
            message: "promotionPrice không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const updateProduct = {}

    if (body.name !== undefined) {
        updateProduct.name = body.name
    }
    if (body.description !== undefined) {
        updateProduct.description = body.description
    }
    if (body.type !== undefined) {
        updateProduct.type = body.type
    }
    if (body.imageUrl !== undefined) {
        updateProduct.imageUrl = body.imageUrl
    }
    if (body.promotionPrice !== undefined) {
        updateProduct.promotionPrice = body.promotionPrice
    }

    //ok het thi lam thoi
    productModel.findByIdAndUpdate(productId, updateProduct, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return res.status(200).json({
            status: "Update Product successfully",
            data: updateProduct
        })
    })
}
//Ham xoa
const deleteProduct = (req, res) => {
    // B1: Chuẩn bị dữ liệu
    let productId = req.params.productId;
    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "ProductTypeByID không hợp lệ"
        })
    }
    // B3: Gọi Model tạo dữ liệu
    productModel.findByIdAndDelete(productId, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return res.status(200).json({
            status: "Delete ProductType successfully"
        })
    })
}
module.exports = {
    createProduct,
    getAllProduct,
    getLimitProduct,
    getProductByID,
    updateProduct,
    deleteProduct,
    getFilterProduct
}