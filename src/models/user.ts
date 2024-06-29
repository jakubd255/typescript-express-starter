import {Schema, model, Types} from "mongoose";



export type UserRole = "ADMIN" | "USER";

export interface User {
    _id?: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: UserRole
}

const UserSchema = new Schema<User>({
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        unique: true, 
        lowercase: true, 
        trim: true,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String, 
        enum: ["ADMIN", "USER"],
        required: true
    },
});

const UserModel = model<User>("users", UserSchema);
export default UserModel;