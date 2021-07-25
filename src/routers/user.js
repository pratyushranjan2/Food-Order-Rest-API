const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');

const serverError = {error: 'Server error'};

router.post('/users', async (req,res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.createAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(500).send(serverError);
    }
});

router.post('/users/login', async(req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.createAuthToken();
        res.send({user, token});
    } catch (error) {
        res.status(400).send({error});
        console.log(error);
    }
});

router.post('/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
        res.send({message: 'Logged out'});
    } catch (error) {
        console.log('Logout error trace:\n'+error);
        res.status(500).send(serverError);
    }
});

router.post('/users/logoutAll', auth, async (req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        console.log('Logout all error trace:\n'+error);
        res.status(500).send(serverError);
    }
});

router.get('/users/me', auth, (req,res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).send(serverError);
    }
});

router.patch('/users/me', auth, async (req,res) => {
    const allowed = ['name', 'password', 'roll', 'email'];
    const updates = Object.keys(req.body);
    const isValidUpdates = updates.every((update) => allowed.includes(update));
    if (!isValidUpdates) {
        res.status(400).send({error: 'Invlalid updates'});
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send({message: 'Updated successfully'});
    } catch (error) {
        res.status(500).send(serverError);
    }
});

router.delete('/users/me', auth, async (req,res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send(serverError);
    }
});

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Image format must be jpg, jpeg or png.'));
        }
        cb(undefined, true);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    const buffer = await sharp(req.file.buffer)
                            .resize({width: 250, height: 250})
                            .png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send({message: 'Image uploaded'});
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
});

router.get('/users/:id/avatar', async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({error: 'User not found'});
        }
        res.set('Content-Type','image/png');
        res.send(user.avatar);
    } catch (error) {
        res.status(500).send();
    }
});

router.delete('/users/me/avatar', auth, async (req,res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

module.exports = router;