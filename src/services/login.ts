import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import User from "@/models/User";

interface LoginRequest {
    email: string;
    password: string;
}
interface ResponseObject {
    message: string;
    status: boolean;
    statusCode: number;
}
export default async function login (reqBodyData: LoginRequest): Promise<ResponseObject> {
    const responseObject = {
        message: "",
        status: false,
        statusCode: 400,
        data: {}
    }
    try {
        await databaseConfiguration();
        const user = await User.findOne({email: reqBodyData.email});
        if (!user) {
            responseObject.message = "User not found";
            responseObject.status = false;
            responseObject.statusCode = 400;
            return responseObject;
        }
        if (!user.isActive) {
            responseObject.message = "User not active. Contact to admin.";
            responseObject.status = false;
            responseObject.statusCode = 400;
            return responseObject;
        }
        if (user.password !== reqBodyData.password) {
            responseObject.message = "Invalid password";
            responseObject.status = false;
            responseObject.statusCode = 400;
            return responseObject;
        }
        responseObject.message = "Login successful";
        responseObject.status = true;
        responseObject.statusCode = 200;
        responseObject.data = user._id;
        return responseObject;
    } catch (error) {
        console.log(error);
        responseObject.message = "Something went wrong";
        responseObject.status = false;
        responseObject.statusCode = 400;
        return responseObject;
    }
}