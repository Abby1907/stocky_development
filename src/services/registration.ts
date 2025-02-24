import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import User from "@/models/User";

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}
interface ResponseObject {
    message: string;
    status: boolean;
    statusCode: number;
}

export default async function register (reqBodyData: RegisterRequest): Promise<ResponseObject> {
    const responseObject: ResponseObject = {
        message: "",
        status: false,
        statusCode: 400
    }
    try {
        await databaseConfiguration();
        const exsistsUser = await User.findOne({email: reqBodyData.email});
        if (exsistsUser) {
            responseObject.message = "User already exists";
            responseObject.status = false;
            responseObject.statusCode = 400;
            return responseObject;

        }
        const saveUser = await User.create(
            {
                name: reqBodyData.name,
                email: reqBodyData.email,
                password: reqBodyData.password
            }
        );
        if (!saveUser) {
            responseObject.message = "User not created";
            responseObject.status = false;
            responseObject.statusCode = 400;
            return responseObject;
        }
        responseObject.message = "User created successfully";
        responseObject.status = true;
        responseObject.statusCode = 200;
        return responseObject;
    } catch (error) {
        console.log(error);
        responseObject.message = "Something went wrong";
        responseObject.status = false;
        responseObject.statusCode = 400;
        return responseObject;
    }
}