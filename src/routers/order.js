const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Food = require('../models/food');
const Order = require('../models/order');
const adminAuth = require('../middleware/adminAuth');

router.post('/orders/:foodID', auth, async (req,res) => {
    try {
        const food = await Food.findById(req.params.foodID);
        if (!food) {
            return res.status(404).send({error: 'Food not found'});
        }
        const order = new Order({
            owner: req.user._id,
            food: req.params.foodID,
            quantity: req.body.quantity || 1
        });
        await order.save();
        res.status(201).send({message: 'Order created'});
    } catch (error) {
        res.status(500).send({error});
    }
});

router.get('/orders', auth, async (req,res) => {
    const match = {};
    if (req.query.paid) {
        match.paid = req.query.paid === 'true';
    }
    try {
        await req.user.populate({
            path: 'orders',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate();
        res.send(req.user.orders);
    } catch (error) {
        res.status(500).send({error});
    }
});

router.get('/orders/:id', adminAuth, async (req,res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send('No order found');
        }
        res.send(order);
    } catch (error) {
        res.status(500).send({error});
    }
});

router.delete('/orders/:id', adminAuth, async (req,res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send({error: 'No order found'});
        }
        await order.delete();
    } catch (error) {
        res.status(500).send({error});
    }
});

module.exports = router; 