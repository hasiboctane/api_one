import express from 'express';
import ProductController from '../controllers/product.controller.js';
import isAuth from '../middlewares/auth.middleware.js';

const productRoute = express.Router();
productRoute.get('/', isAuth, ProductController.getAllProducts);
productRoute.get('/:id', isAuth, ProductController.getProductById);

export default productRoute