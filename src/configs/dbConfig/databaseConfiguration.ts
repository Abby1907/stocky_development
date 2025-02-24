import mongoose from "mongoose";
export default async function databaseConfiguration (): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const connect = mongoose.connection;
        connect.on("open", () => {
            console.log("Database connected successfully");
        });
        connect.on("error", (error) => {
            console.log("Database connection error ! " + error);
        })        
    } catch (error) {
        console.log(error);
    }
}