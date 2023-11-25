import express from 'express'
import UserController from '../controllers/user.controller.js';

const userRoute = express.Router();
userRoute.get('/', UserController.getAll);
userRoute.post('/', UserController.addUser);

export default userRoute