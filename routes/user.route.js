import express from 'express'
import UserController from '../controllers/user.controller.js';
import isAuth from '../middlewares/auth.middleware.js';
import singleUpload from '../middlewares/multer.js';

const userRoute = express.Router();
userRoute.get('/', UserController.getUsers);
userRoute.post('/register', UserController.registerUser);
userRoute.post('/login', UserController.loginUser);

userRoute.get('/logout', isAuth, UserController.logoutUser);
userRoute.get('/user-profile', isAuth, UserController.getUserProfile);
userRoute.put('/update', isAuth, UserController.updateUserProfile);
userRoute.put('/update-password', isAuth, UserController.updateUserPassword);
userRoute.put('/update-profile-picture', isAuth, singleUpload, UserController.updateUserProfilePicture);


export default userRoute