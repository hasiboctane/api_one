import express from 'express'
import UserController from '../controllers/user.controller.js';

const userRoute = express.Router();
userRoute.get('/', UserController.getUsers);
userRoute.post('/register', UserController.registerUser);
userRoute.post('/login', UserController.loginUser);

export default userRoute