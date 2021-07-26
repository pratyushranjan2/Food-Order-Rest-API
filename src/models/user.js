const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('./order');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('email is invalid');
        }
    },
    roll: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) throw new Error('Password cannot contain "password"');
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
});

userSchema.virtual('orders', {
    ref: 'order',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.createAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {'expiresIn': '7 days'});
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('Unable to login');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Unable to login');
    }
    return user;
}

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;