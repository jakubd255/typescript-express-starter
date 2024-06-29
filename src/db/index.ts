import mongoose from "mongoose";
import createAdmin from "../admin";



const connectToDataBase = async () => {
    mongoose.connect(process.env.MONGO_URI as string).then(() => {
        console.log("Database connected");
        createAdmin();
    })
    .catch(err => {
        console.error("Database connection error: ", err);
        process.exit(1);
    });
}

export default connectToDataBase;