
const ProductController = {
    getAllProducts: async (req, res) => {
        try {
            // const products = await Product.find({});
            res.status(200).send({
                success: true,
                message: 'Products fetched successfully',
                // products
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
            // const product = await Product.findById(req.params.id);
            res.status(200).send({
                success: true,
                message: 'Product fetched successfully',
                // product
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                error: error
            });
        }
    }
}
export default ProductController;