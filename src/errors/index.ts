import {Request, Response} from "express";



export const catchAsync = (fn: (req: Request, res: Response) => Promise<Response>) => {
    return (req: Request, res: Response) => {
        fn(req, res).catch((err) => {
            console.error(err);
            return res.status(500).send("Something went wrong");
        });
    }
}