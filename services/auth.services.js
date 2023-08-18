import UserModel from "../models/user.model.js";

export const createUserService = async (newUserData) => {
    const data = await new UserModel(newUserData)
    await data.save()
}

export const getUserService = async (email) => {
    const data = await UserModel.findOne({ email: email });
    return data
}

export const updateUserService = async (id, updates) => {
    const { username, email, photo, address, university } = updates;

    const data = await UserModel.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                username: username,
                email: email,
                photo: photo,
                address: address,
                university: university
            }
        },
        { new: true }
    );
    return data
}