import express from 'express';
import cloudinary from 'cloudinary';

import User from '../models/user.model.js';
import getDataUri from '../utils/features.js';
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
                return res.status(400).send({ message: 'Please fill all the fields' })
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
    logoutUser: async (req, res) => {
        try {
            // clear cookie and redirect
            res.status(200).clearCookie('token').send({
                success: true,
                message: 'User logged out successfully'
            })
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
    },
    updateUserProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            const { name, email, address, city, country, phone } = req.body;
            if (name) user.name = name;
            if (email) user.email = email;
            if (address) user.address = address;
            if (city) user.city = city;
            if (country) user.country = country;
            if (phone) user.phone = phone;
            await user.save();
            res.status(200).send({
                success: true,
                message: 'User profile updated successfully'
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    updateUserPassword: async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            const { oldPassword, newPassword } = req.body;
            if (!oldPassword || !newPassword) {
                res.status(400).send({ message: 'Please provide old and new password' })
            }
            const isMatch = await user.comparePassword(oldPassword);
            if (!isMatch) {
                res.status(400).send({ message: 'Old password is incorrect' })
            } else {
                user.password = newPassword;
                await user.save();
                res.status(200).send({
                    success: true,
                    message: "password updated successfully"
                });
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    updateUserProfilePicture: async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            const file = getDataUri(req.file);
            // delete previous picture
            await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
            // update picture
            const result = await cloudinary.v2.uploader.upload(file.content);
            user.profilePic = {
                public_id: result.public_id,
                url: result.secure_url
            }
            await user.save();
            res.status(200).send({
                success: true,
                message: 'Profile picture updated successfully'
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