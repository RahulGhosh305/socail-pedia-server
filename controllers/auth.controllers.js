import bcrypt from 'bcrypt'
import { createUserService, getUserService, updateUserService, varifyUser } from "../services/auth.services.js"
import jwt from 'jsonwebtoken'

export const userCreate = async (req, res) => {
    const { email, password, photo, address, university, username } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await getUserService(email);

        if (oldUser) {
            return res.json({ error: "User Exists" });
        }
        const newUser = { password: encryptedPassword, email, photo, address, university, username }
        const response = await createUserService(newUser);
        const resposeClientSite = {
            name: response.username,
            email: response.email,
            address: response.address,
            photo: response.photo,
            university: response.university
        }
        res.send({ status: "User Created" });
    } catch (error) {
        res.send({ status: "User Created Failed" });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserService(email);

    if (!user) {
        return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, `${process.env.SECRET_KEY}`, {
            expiresIn: "5h",
        });

        if (res.status(201)) {
            return res.json({ status: "loggedIn", data: token });
        } else {
            return res.json({ error: "Loging Error" });
        }
    }
    res.json({ status: "error", error: "InvAlid Password" });
}


export const updateProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updatedUser = await updateUserService(id, updates);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ status: "Data Update Successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const protectedUser = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = await jwt.verify(`${token}`, `${process.env.SECRET_KEY}`);
        const data = await varifyUser(decoded.email)
        const isUser = {
            id: data._id,
            username: data.username,
            email: data.email,
            photo: data.photo,
            address: data.address,
            university: data.university
        }
        res.json(isUser);
    } catch (error) {
        res.status(403).json({ message: 'Failed to decode token', error: error.message });
    }

}