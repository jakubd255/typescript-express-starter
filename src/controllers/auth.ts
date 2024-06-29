import {Request, Response} from "express";
import UserModel, {User} from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {hashPassword} from "../utils";



export const register = async (req: Request, res: Response) => {
    const user: User = req.body;

    const isEmailTaken = await UserModel.exists({email: user.email}).exec();
    if(isEmailTaken) {
        return res.status(409).json({
            isEmailTaken: true
        });
    }

    user.password = hashPassword(user.password);
    user.role = "USER";

    const newUser = new UserModel(user);
    await newUser.save();

    const payload = {_id: newUser._id};
    const token = jwt.sign({payload}, process.env.JWT_SIGNATURE as string);

    res.cookie("access-token", token, {httpOnly: true});
    res.cookie("is-logged", "true");
    return res.status(201).json({token: token});
}



export const logIn = async (req: Request, res: Response) => {
    const {email, password}: User = req.body;

    const user = await UserModel.findOne({email: email}).exec();

    if(!user) {
        return res.status(403).send("User doesn't exist");
    }

    const hash = user.password;
    const isCorrect = bcrypt.compareSync(password, hash);

    if(!isCorrect) {
        return res.status(403).send("Invalid password");
    }

    const payload = {_id: user._id};
    const token = jwt.sign({payload}, process.env.JWT_SIGNATURE as string);

    res.cookie("access-token", token, {httpOnly: true});
    res.cookie("is-logged", "true");
    return res.status(200).json({token: token});

}



export const logOut = async (req: Request, res: Response) => {
    res.clearCookie("access-token");
    res.clearCookie("is-logged");
    return res.status(200).send("Logged out successfully");
}



export const authenticate = async (req: Request, res: Response) => {
    return res.status(200).json(req.body.user);
}



export const admin = async (req: Request, res: Response) => {
    return res.status(200).send("Hello, Admin");
}