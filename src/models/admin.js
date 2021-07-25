const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validator(value) {
            if (!validator.isEmail(value)) throw new Error('Invalid email');
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validator(value) {
            if (value.toLowerCase().includes('password')) throw new Error('Password cannot contain "password"');
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

adminSchema.methods.toJSON = function() {
    const admin = this;
    const adminObj = admin.toObject();
    delete adminObj.password;
    delete adminObj.tokens;

    return adminObj;
}

adminSchema.methods.createAuthToken = async function() {
    const admin = this;
    const token = jwt.sign({_id: admin._id.toString()}, process.env.JWT_SECRET, {'expiresIn': '7 days'});
    admin.tokens = admin.tokens.concat({token});
    await admin.save();
    return token;
}

adminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({email});
    if (!admin) {
        throw new Error('Unable to login');
    }
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
        throw new Error('Unable to login');
    }
    return admin;
}

adminSchema.pre('save', async function(next) {
    const admin = this;
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }
    next();
})

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;