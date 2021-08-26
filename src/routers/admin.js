const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();
const Admin = require('../models/admin');

router.post('/admin', async (req,res) => {
    try {
        const admins = await Admin.find({});
        if (admins.length > 0) {
            throw new Error('Admin already present. Cannot create a new one.');
        }
        const admin = new Admin(req.body);
        await admin.save();
        const token = await admin.createAuthToken();
        res.status(201).send({admin, token});
    } catch (error) {
        res.status(500).send({error});
    }
});

router.post('/admin/login', async (req,res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password);
        const token = await admin.createAuthToken();
        res.send({admin, token});
    } catch (error) {
        res.status(400).send({error});
    }
});

router.post('/admin/logout', adminAuth, async (req,res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => token.token !== req.token);
        await req.admin.save();
        res.send({message: 'Logged out'});
    } catch (error) {
        res.status(500).send({error});
    }
});

router.post('/admin/logoutAll', adminAuth, async (req,res) => {
    try {
        req.admin.tokens = [];
        await req.admin.save();
        res.send({message: 'Logged out from all devices'});
    } catch (error) {
        res.status(500).send({error});
    }
});

router.patch('/admin/current', adminAuth, async (req,res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['email', 'password', 'name'];
        const updatesValid = updates.every((update) => allowedUpdates.includes(update));
        if (!updatesValid) {
            res.status(400).send({error: 'Invalid updates'});
        }
        updates.forEach((update) => req.admin[update] = req.body[update]);
        await req.admin.save();
        res.send({message: 'Details updated successfully'});
    } catch (error) {
        res.status(400).send({error})
    }
});

module.exports = router; 