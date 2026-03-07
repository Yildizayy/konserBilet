const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    SurName: {
        type: String,
        required: true
    },
    Yas: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
    { timestamps: true })

module.exports = mongoose.model('User', userSchema)