import Mongoose from "mongoose";

const connectDB = async (dbUrl) => {
    try {
        const conn = await Mongoose.connect(dbUrl, { dbName: 'api_one' })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
    }

}

export default connectDB