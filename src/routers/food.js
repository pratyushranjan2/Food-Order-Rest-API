const express = require('express');
const router = express.Router();
const Food = require('../models/food');
const adminAuth = require('../middleware/adminAuth');
const multer = require('multer');
const sharp = require('sharp');

const foodProperties = ['name','description','availability','stock','discount','price','stars'];

router.post('/food', adminAuth, async (req,res) => { 
    const food = new Food(req.body);
    try {
        await food.save();
        res.status(201).send({message: 'Food successfully added'});
    } catch (error) {
        res.status(500).send({error});
    }
});

router.get('/food/:id', async (req,res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            throw new Error();
        }
        res.send(food);
    } catch (error) {
        res.status(404).send({error});
    }
});

router.get('/food', async (req,res) => {
    const filters = Object.keys(req.body);
    filters.forEach((filter) => {
        if (!foodProperties.includes(filter)) {
            delete req.body[filter];
        }
    });
    try {
        const foods = await Food.find(req.body).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip));
        res.send(foods);
    } catch (error) {
        res.status(500).send({error});
    }
});

router.patch('/food/:id', adminAuth, async (req,res) => {
    const allowed = ['name','price','availability','description','discount'];
    const updates = Object.keys(req.body);
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            throw new Error('404 food not found');
        }
        const isAllowed = updates.every((update) => allowed.includes(update));
        if (!isAllowed) {
            throw new Error('Invalid updates');
        }
        updates.forEach((update) => food[update] = req.body[update]);
        await food.save();
        res.send(food);
    } catch (error) {
        res.status(400).send({error});
    }
});

router.delete('/food/:id', adminAuth, async (req,res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).send({error: 'No food dound'});
        }
        await food.remove();
        res.send(food);
    } catch (error) {
        res.status(500).send({error: 'Server error'});
    }
});

const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('File format must be jpg, jpeg or png'));
        }
        return cb(undefined, true);
    }
});

router.post('/food/:id/image', adminAuth, upload.single('image'), async (req,res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            console.log('*** No food found ***')
            return res.status(404).send({error: 'Food not found'});
        }
        const buffer = await sharp(req.file.buffer).png().toBuffer();
        food.image = buffer;
        await food.save();
        res.send({message: 'Image uploaded'})
    } catch (error) {
        res.status(500).send({error});
    }
});

router.get('/food/:id/image', async (req,res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).send({error: 'Food not found'});
        }
        res.set('Content-Type', 'image/png');
        res.send(food.image);
    } catch (error) {
        res.status(500).send({error});
    }
});

router.delete('/food/:id/image', adminAuth, async (req,res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).send({error: 'Food not found'});
        }
        food.image = undefined;
        await food.save();
    } catch (error) {
        res.status(500).send({error});
    }
});

module.exports = router; 