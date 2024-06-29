import {Request, Response} from "express";
import UserModel from "../models/user";
import {hashPassword} from "../utils";



export const getUser = async (req: Request, res: Response) => {
    const {id} = req.params;

    const user = await UserModel.findById(id).select("-password").exec();
    if(!user) {
        return res.status(404).send();
    }
    else {
        return res.status(200).json(user);
    }
}



export const getUsersList = async (req: Request, res: Response) => {
    const users = await UserModel.find().select("-password").exec();
    return res.status(200).json(users);
}



export const updateUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {user, ...data} = req.body;

    //User can update his own account
    //Admin can update any and change roles
    if(!(user.role === "ADMIN" || user._id === id)) {
        return res.status(403).send();
    }
    if(user.role !== "ADMIN") {
        delete data.role;
    }

    if(data.password) {
        data.password = hashPassword(data.password);
    }

    if(data.email) {
        const isEmailTaken = await UserModel.exists({email: user.email}).exec();
        if(isEmailTaken) {
            return res.status(409).json({
                isEmailTaken: true
            });
        }
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
        id, data, {new: true, runValidators: true}
    ).select("-password").exec();

    if(!(updatedUser)) {
        return res.status(404).send();
    }
    else {
        return res.status(200).json(updatedUser);
    }
}



export const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {user}= req.body;

    //User can delete his own account
    //Admin can delete any
    if(!(user.role === "ADMIN" || user._id === id)) {
        return res.status(403).send();
    }

    if(!(await UserModel.findByIdAndDelete(id).exec())) {
        return res.status(404).send();
    }
    else {
        return res.status(200).send();
    }
}