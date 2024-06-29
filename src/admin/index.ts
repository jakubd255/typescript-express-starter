import UserModel, {User} from "../models/user";
import {hashPassword} from "../utils";



const createAdmin = async () => {
    const isAdminExisting = (await UserModel.count({role: "ADMIN"}).exec()) === 0;

    if(isAdminExisting) {
        const user: User = {
            username: "admin",
            email: "admin@admin.com",
            password: hashPassword(process.env.ADMIN_PASSWORD as string),
            role: "ADMIN"
        };
    
        const newUser = new UserModel(user);
        await newUser.save();
    
        console.log("Admin user has been created");
    }
}

export default createAdmin;