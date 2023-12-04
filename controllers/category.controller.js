import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

const CategoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find({});
            res.status(200).send({
                success: true,
                message: 'Categories fetched successfully',
                count: categories.length,
                categories
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    getCategoryById: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).send({
                    success: false,
                    message: 'Category not found'
                });
            }
            res.status(200).send({
                success: true,
                message: 'Categories fetched successfully',
                category
            })
        } catch (error) {
            // CastError 
            if (error.name === 'CastError') {
                return res.status(404).send({
                    success: false,
                    message: 'Invalid Id'
                });
            }
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    addCategory: async (req, res) => {
        try {
            const { category } = req.body;
            if (!category) {
                return res.status(400).send({
                    success: false,
                    message: 'Please provide category field'
                });
            };
            const result = await Category.create({
                category
            });
            res.status(201).send({
                success: true,
                message: `${category} created successfully`,
                result
            });

        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).send({
                    success: false,
                    message: 'Category not found'
                });
            }
            // find products with this category
            const products = await Product.find({ category: category._id });
            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                product.category = undefined;
                await product.save();
            }
            // delete category
            await category.deleteOne();
            res.status(200).send({
                success: true,
                message: 'Category deleted successfully'
            })
        } catch (error) {
            // CastError 
            if (error.name === 'CastError') {
                return res.status(404).send({
                    success: false,
                    message: 'Invalid Id'
                });
            }
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).send({
                    success: false,
                    message: 'Category not found'
                });
            }
            // get updated category
            const { updatedCategory } = req.body;
            // find products with this category 
            const products = await Product.find({ category: category._id });
            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                product.category = updatedCategory;
                // save product
                await product.save();
            }
            // update category
            if (updatedCategory) category.category = updatedCategory;
            await category.save();
            res.status(200).send({
                success: true,
                message: 'Category updated successfully',
                category
            })
        } catch (error) {
            // CastError 
            if (error.name === 'CastError') {
                return res.status(404).send({
                    success: false,
                    message: 'Invalid Id'
                });
            }
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    }
}

export default CategoryController