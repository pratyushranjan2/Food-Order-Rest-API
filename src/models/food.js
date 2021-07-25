const mongoose = require('mongoose');
const validator = require('validator');
require('./order')

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
    },
    availability: {
        type: Boolean,
        require: true
    },
    stock: {
        type: Number
    },
    description: {
        type: String,
        trim: true
    },
    stars: {
        type: Number,
        validate(value) {
            if (value < 0 || value > 5) throw new Error('Invalid ratings');
        }
    },
    image: {
        type: Buffer
    }
});

foodSchema.virtual('orders', {
    ref: 'order',
    localField: '_id',
    foreignField: 'food'
});

const Food = mongoose.model('food', foodSchema);
module.exports = Food;