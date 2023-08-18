import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/]
    },
    photo: {
        type: String,
        required: false,
        default: null
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        default: null
    },
    university: {
        type: String,
        require: true,
        lowercase: true,
        trim: true
    }
}, { timestamps: true });

const UserModel = mongoose.model("be_user", schema);
export default UserModel