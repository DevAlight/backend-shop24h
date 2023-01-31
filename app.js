//import lib express js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
//khoi tao 1 app express
const app = express();

//khai bao cong
const port = process.env.PORT ||8000;
//khai bao route app
const productRoute = require("./app/routes/productRoute");
const customerRoute = require("./app/routes/customerRoute");
const orderRoute = require("./app/routes/orderRoute");
const orderDetailRoute = require("./app/routes/orderDetailRoute");
const userRoute =require('./app/routes/userRouter');

//khai bao body
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
res.setHeader('Access-Control-Allow-Credentials', true);
next(); 
});


//Ket noi mongo
mongoose.connect('mongodb://mongo:MiMyogY3UnecNs9c1guT@containers-us-west-99.railway.app:7993', function (error) {
    if (error) throw error;
    console.log('Successfully connected MongoDB');
})

// App sử dụng router
app.use("/", productRoute);
app.use("/", customerRoute);
app.use("/", orderRoute);
app.use("/", orderDetailRoute);
app.use("/", userRoute);


//chay app tren cong 
app.listen(port, () => {
    console.log(`App đã chạy trên cổng ${port}`);
})