import express from 'express'
import User from '../models/user.model.js';
const UserController = {
    getUsers: async (req, res) => {
        try {
            const options = {
                password: 0
            }
            const users = await User.find({});
            res.status(200).send({
                success: true,
                message: 'Users fetched successfully',
                users
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    registerUser: async (req, res) => {
        try {
            const { name, email, password, address, city, country, phone } = req.body;
            if (!name || !email || !password || !address || !city || !country || !phone) {
                res.status(400).send({ message: 'Please fill all the fields' })
            } else {
                const user = await User.findOne({ email });
                if (user) {
                    res.status(400).send('Email already exists')
                } else {
                    const newUser = await User.create({ name, email, password, address, city, country, phone })
                    res.status(201).send({
                        success: true,
                        message: 'User created successfully',
                        newUser
                    })
                }
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).send({ message: 'Please fill all the fields' })
            } else {
                const user = await User.findOne({ email });
                if (!user) {
                    res.status(400).send({ message: 'User not found' });
                } else {
                    const isMatch = await user.comparePassword(password);
                    if (!isMatch) {
                        res.status(400).send({ message: 'Credentials do not match' });
                    } else {
                        // token 
                        const token = user.generateToken();
                        res.status(200).cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) }).send({
                            success: true,
                            message: 'User logged in successfully',
                            token,
                            user
                        })
                    }
                }
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    getUserProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user._id, { password: 0 });
            res.status(200).send({
                success: true,
                message: 'User profile fetched successfully',
                // user: req.user
                user
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    }

}

export default UserController