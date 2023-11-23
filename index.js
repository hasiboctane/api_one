import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config();
const app = express();



app.listen(3000, () => console.log('Server running on port 3000'));