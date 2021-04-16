const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Name is a required input'
    },
    email: {
        type: String,
        required: 'Email is a required input',
        unique: true
    },
    password: {
        type: String,
        required: 'Password is a required input'
    }
});

const model = mongoose.model('user', userSchema);
module.exports = model;