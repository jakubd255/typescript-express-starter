import express, {Express} from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToDataBase from "./db";
import auth from "./routes/auth";
import users from "./routes/users";
import {checkEnvironmentVariables} from "./utils";


dotenv.config();

const server: Express = express();

server.use(express.json());
server.use(cors({origin: "*", credentials: true}));
server.use(cookieParser());

server.use("/auth", auth);
server.use("/users", users);

checkEnvironmentVariables();
connectToDataBase();

const port = process.env.PORT || 8000;
server.listen(port, async () => {
    console.log(`Server runs on port ${port}`);
});

export default server;