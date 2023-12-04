import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import isAuth from '../middlewares/auth.middleware.js';

const categoryRoute = express.Router();

categoryRoute.get('/', isAuth, CategoryController.getAllCategories);
categoryRoute.get('/:id', isAuth, CategoryController.getCategoryById);
categoryRoute.post('/add', isAuth, CategoryController.addCategory);
categoryRoute.delete('/delete/:id', isAuth, CategoryController.deleteCategory);
categoryRoute.put('/update/:id', isAuth, CategoryController.updateCategory);

export default categoryRoute