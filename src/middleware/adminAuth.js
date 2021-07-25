const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

const adminAuth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({_id: decoded._id, 'tokens.token': token});
        if (!admin) {
            console.log('*** No admin found ***');
            throw new Error();
        }
        req.admin = admin;
        req.token = token;
        next();
    } catch (error) {
        res.status(404).send('Please authenticate as admin.');
    }
}

module.exports = adminAuth;