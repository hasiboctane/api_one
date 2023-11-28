import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const isAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized access!  Please login to continue'
        })
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decodedData._id);
    next();

}
export default isAuth