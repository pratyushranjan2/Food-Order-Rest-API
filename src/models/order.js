const mongoose = require('mongoose');
const User = require('./user');
const Food = require('./food');
const moment = require('moment-timezone');

const orderSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'food'
    },
    quantity: {
        type: Number,
        default: 1
    },
    paid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;