import { createPostService, getPostService, addCommentService, addLikeService } from "../services/social.services.js";

export const contentPost = async (req, res) => {
    const data = req.body;
    const response = await createPostService(data)

    res.status(200).json({
        data: response,
        status: "Posted Successful"
    })
}

export const getPost = async (req, res) => {
    const response = await getPostService()

    res.status(200).json({
        data: response,
        status: "Posted Successful"
    })
}

export const addComment = async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    const response = await addCommentService(id, data)

    res.status(200).json({
        data: response,
        status: "Posted Comment Successful"
    })
}


export const addLike = async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    const response = await addLikeService(id, data)

    res.status(200).json({
        data: response,
        status: "Posted Comment Successful"
    })
}