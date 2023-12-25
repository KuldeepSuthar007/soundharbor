const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    try {
        const { name, mobile, email, password } = req.body;
        if (!name || !mobile || !email || !password) {
            return res.status(400).json({
                success: false,
                errormessage: "All fields are required"
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).json({
                success: false,
                message: "email address already exists. Please login!"
            })
        }
        const encryptedPassword = await bcrypt.hash(password, 10)
        const newuser = {
            name,
            mobile,
            email,
            password: encryptedPassword,
        }
        await User.create(newuser)
        const jwToken = Jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 60 })
        res.status(200).json({
            success: true,
            message: "User created successfully",
            user: email,
            jwToken
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            errormessage: "Something went wrong"
        })
    }
})


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                errormessage: "Email and password are required'"
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                errormessage: "Invalid Email or password"
            })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                errormessage: "Invalid Email and password"
            })
        }
        const jwToken = Jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        res.status(200).json({
            success: true,
            user: email,
            message: "your are login successfully",
            jwToken

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            errormessage: "Something went wrong"
        })
    }
})


module.exports = router;