import {Request, Response, NextFunction} from "express";
import {User} from "../models/user";



const admin = (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.body.user;

    if(user.role !== "ADMIN") {
        return res.status(403).send();
    }

    next();
}

export default admin;