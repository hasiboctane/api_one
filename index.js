import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import colors from 'colors';
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './routes/api.route.js'
dotenv.config();
const app = express();
// middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());

// route
app.use('/api', router);

// server and database connection
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/api_one'
app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`.bgMagenta);
    connectDB(dbUrl)
});