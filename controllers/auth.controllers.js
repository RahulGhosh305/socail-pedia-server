import bcrypt from 'bcrypt'
import { createUserService, getUserService, updateUserService } from "../services/auth.services.js"
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
        const token = jwt.sign({ email: user.email }, `${process.env.MONGODB_URL}`, {
            expiresIn: "1h",
        });

        if (res.status(201)) {
            return res.json({ status: "LoggedIn", data: token });
        } else {
            return res.json({ error: "Loging Error" });
        }
    }
    res.json({ status: "error", error: "InvAlid Password" });
}


export const updateProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body; // Assuming the updates are sent in the request body

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