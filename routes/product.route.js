import express from 'express';
import ProductController from '../controllers/product.controller.js';
import isAuth from '../middlewares/auth.middleware.js';
import singleUpload from '../middlewares/multer.js';

const productRoute = express.Router();
productRoute.get('/', isAuth, ProductController.getAllProducts);
productRoute.get('/:id', isAuth, ProductController.getProductById);
productRoute.post('/add', isAuth, singleUpload, ProductController.addProduct);
productRoute.put('/update/:id', isAuth, ProductController.updateProduct);

export default productRoute