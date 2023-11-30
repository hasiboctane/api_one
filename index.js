import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import colors from 'colors';
import dotenv from 'dotenv'
import cloudinary from 'cloudinary';

import cookieParser from 'cookie-parser';
import connectDB from './config/db.js'
import router from './routes/api.route.js'
dotenv.config();
const app = express();
// middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// route
app.use('/api', router);

// cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// server and database connection
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/api_one'
app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`.bgMagenta);
    connectDB(dbUrl)
});