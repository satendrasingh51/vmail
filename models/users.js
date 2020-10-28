const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    name: {
        type: String
    },
    password: {
        type: String
    },
    mobile: {
        type: Number
    },
    dob: {
        type: Date
    },
    gender: {
        type: String
    },
    image: {
        type: String
    },
    resetToken: String,
    expireToken: Date,
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = User = mongoose.model('users', UserSchema);
