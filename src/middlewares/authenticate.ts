import jwt, {JwtPayload} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import UserModel, {User} from "../models/user";



const authenticate = (req: Request, res: Response, next: NextFunction) => {
    let token: string;

    if(req.headers["authorization"]) {
        token = req.headers["authorization"]?.split(" ")[1];
    }
    else if(req.cookies["access-token"]) {
        token = req.cookies["access-token"];
    }
    else {
        return res.status(401).send();
    }
    
    jwt.verify(token, process.env.JWT_SIGNATURE as string, (err, data) => {
        if(err) {
            return res.status(401).send();
        }
            
        const jwtData = data as JwtPayload;

        const id = jwtData.payload._id;
        if(!id) {
            return res.status(400).send();
        }

        UserModel.findById(id).select("-password").exec().then(user => {
            req.body.user = user as User;
            next();
        }).catch(() => {
            return res.status(404).send();
        });
    });
}

export default authenticate;