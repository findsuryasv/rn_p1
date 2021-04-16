const router = require('express').Router()
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.route('/register').post(async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10))
        const createdUser = await userModel.create({
            ...req.body,
            password: hashedPassword
        });
        const token = jwt.sign(createdUser['_id'], 'CODER_V', {
            expiresIn: 3600
        })
        res.status(201).json({
            token,
            name: createdUser['name']
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.route('/authenticate').post(async (req, res) => {
    try {
        const matchUser = await userModel.findOne({ email: req.body.email });
        if (matchUser) {
            const matchPassword = await bcrypt.compare(req.body.password, matchUser['password']);
            if (matchPassword) {
                const token = jwt.sign(createdUser['_id'], 'CODER_V', {
                    expiresIn: 3600
                })
                res.status(201).json({
                    token,
                    name: createdUser['name']
                });
            } else {
                res.status(409).json('Incorrect password');

            }
        } else {
            res.status(409).json('Incorrect Email');
        }
        const hashedPassword = await bcrypt.genSalt(req.body.password, 10);
        const createdUser = await userModel.create({
            ...req.body,
            password: hashedPassword
        });
        const token = jwt.sign(createdUser['_id'], 'CODER_V', {
            expiresIn: 3600
        })
        res.status(201).json({
            token,
            name: createdUser['name']
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;