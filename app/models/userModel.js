// Khai báo thư viên mongooseJS
const mongoose = require('mongoose')

// Khai báo Class Schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema);