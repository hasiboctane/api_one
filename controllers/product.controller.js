import cloudinary from "cloudinary";
import Product from "../models/product.model.js";
import getDataUri from "../utils/features.js";

const ProductController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find({});
            res.status(200).send({
                success: true,
                message: 'Products fetched successfully',
                products
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                res.status(404).send({
                    success: false,
                    message: 'Product not found'
                });
            } else {
                res.status(200).send({
                    success: true,
                    message: 'Product fetched successfully',
                    product
                });
            }
        } catch (error) {
            // Cast error
            if (error.name === 'CastError') {
                res.status(404).send({
                    success: false,
                    message: 'Invalid Id'
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: error.message,
                    error: error
                });
            }
        }
    },
    addProduct: async (req, res) => {
        try {
            const { name, description, price, stock, category } = req.body;
            if (!name || !description || !price || !stock) {
                return res.status(400).send({
                    success: false,
                    message: 'Please provide all fields'
                });
            };
            if (!req.file) {
                return res.status(400).send({
                    success: false,
                    message: 'Please provide product image'
                });
            };
            const file = getDataUri(req.file);
            const result = await cloudinary.v2.uploader.upload(file.content);
            const image = {
                public_id: result.public_id,
                url: result.secure_url
            };
            const product = await Product.create({
                name, description, price, stock, category, images: [image]
            })
            res.status(201).send({
                success: true,
                message: 'Product created successfully',
                product
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).send({
                    success: false,
                    message: 'Product not found'
                });
            }
            const { name, description, price, stock, category } = req.body;
            if (name) product.name = name;
            if (description) product.description = description;
            if (price) product.price = price;
            if (stock) product.stock = stock;
            if (category) product.category = category;
            await product.save();
            res.status(200).send({
                success: true,
                message: "Product details updated Successfully",
                product
            });
        } catch (error) {
            // Cast error
            if (error.name === 'CastError') {
                return res.status(404).send({
                    success: false,
                    message: 'Invalid Product Id'
                });
            }
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    updateProductImage: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).send({
                    success: false,
                    message: 'Product not found'
                });
            }
            if (!req.file) {
                return res.status(400).send({
                    success: false,
                    message: 'Please provide product image'
                });
            }
            const file = getDataUri(req.file);
            const result = await cloudinary.v2.uploader.upload(file.content);
            const image = {
                public_id: result.public_id,
                url: result.secure_url
            }
            product.images.push(image);
            await product.save();
            res.status(200).send({
                success: true,
                message: 'Product image updated successfully',
                product
            });

        } catch (error) {
            // Cast error
            if (error.name === 'CastError') {
                return res.status(404).send({
                    success: false,
                    message: 'Invalid Product Id'
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
export default ProductController;