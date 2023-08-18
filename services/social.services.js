import PostModel from "../models/social.model.js";

export const createPostService = async (postData) => {
    const data = await new PostModel(postData)
    await data.save()
    return data
}

export const getPostService = async () => {
    const data = await PostModel.find({})
    return data
}

export const getSinglePostService = async (id) => {
    const data = await PostModel.findOne({ _id: id })
    return data
}

export const addCommentService = async (id, postCommentData) => {
    const data = await PostModel.findOneAndUpdate(
        { _id: id },
        {
            $push: { comments: postCommentData }
        },
        { new: true }
    )

    return data
}

export const addLikeService = async (id, postLike) => {
    console.log(id);
    const data = await PostModel.findOneAndUpdate(
        { _id: id },
        {
            $push: { like: postLike }
        },
        { new: true }
    )

    return data
}