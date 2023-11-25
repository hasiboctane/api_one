import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: [true, 'Email already exists'],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        min: [6, 'Password must be at least 6 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add address']
    },
    city: {
        type: String,
        required: [true, 'Please add city']
    },
    country: {
        type: String,
        required: [true, 'Please add country']
    },
    phone: {
        type: String,
        required: [true, 'Please add phone number']
    },
    profile: {
        type: String
    }
},
    {
        timestamps: true
    }
)
const User = mongoose.model('User', UserSchema)

export default User