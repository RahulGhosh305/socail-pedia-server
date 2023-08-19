import mongoose from 'mongoose';
const { Schema, ObjectId } = mongoose;


const userSchema = new Schema({
    _id: { type: ObjectId, required: false, ref: 'be_user' },
    name: { type: String, required: false, default: null },
    photo: { type: String, required: false, default: null },
}, { _id: false });

const schema = new Schema({
    user: {
        type: userSchema,
        required: true,
    },
    postText: {
        type: String,
        trim: true,
        required: false,
        default: null
    },
    postPhoto: {
        type: String,
        required: false,
        default: null
    },
    comments: [{
        commentText: String,
        user: userSchema,

    }],
    like: [{
        isLiked: Boolean,
        user: userSchema
    }]
}, { timestamps: true });


const PostModel = mongoose.model("posts", schema);
export default PostModel