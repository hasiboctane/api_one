import express from 'express'
import User from '../models/user.model.js';
const UserController = {
    getAll: async (req, res) => {
        res.send('Hello World --> All Users')
    },
    addUser: async (req, res) => {
        try {
            const { name, email, password, address, city, country, phone } = req.body;
            if (!name || !email || !password || !address || !city || !country || !phone) {
                res.status(400).send('Please fill all the fields')
            } else {
                const user = await User.create({ name, email, password, address, city, country, phone })
                res.status(201).send({
                    message: 'User created successfully',
                    user
                })
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export default UserController