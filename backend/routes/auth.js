const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models')
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: `user with ${email} already exists`})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await db.User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })

        res.status(201).json({ 
            id: newUser.id, 
            email: newUser.email, 
            firstName: newUser.firstName, 
            lastName: newUser.lastName})
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.User.findOne({ where: { email }});
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error})
    }
})

module.exports = router;