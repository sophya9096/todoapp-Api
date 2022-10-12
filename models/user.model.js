const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        minlenght: 8,
        trim: true,
    }
},{timestamps: true})

exports.userModel = mongoose.model('user', userSchema);