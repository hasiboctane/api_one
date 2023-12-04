import express from 'express'
import userRoute from './user.route.js';
import productRoute from './product.route.js';
import categoryRoute from './category.route.js';
const router = express.Router();

router.use('/users', userRoute);
router.use('/products', productRoute);
router.use('/category', categoryRoute);

export default router