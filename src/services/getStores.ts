import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import Store from "@/models/Store";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

interface Store {
    _id: string;
    store_name: string;
    address: string;
    store_type: string;
    employee_number: string;
    gst_number: string;
    store_id: string;
    user_id: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
interface StoresResponse {
    status: boolean;
    message: string;
    status_code: number;
    data?: Store[];
}

export async function getStores(token: JwtPayload): Promise<StoresResponse> {
    const responseObject = {
        message: "",
        status: false,
        status_code: 400,
        data: [] as Store[],
    };
 try {
    await databaseConfiguration();
    const getUser = new mongoose.Types.ObjectId(token.id);
    const getStores = await Store.find({user_id: getUser, isActive: true});
    if(!getStores) {
        responseObject.message = "No stores found";
        responseObject.status = false;
        responseObject.status_code = 400;
        responseObject.data = [];
        return responseObject;
    }
    responseObject.message = "Stores found";
    responseObject.status = true;
    responseObject.status_code = 200;
    responseObject.data = getStores as Store[];
    return responseObject;
 } catch (error) {
    console.log(error);
    responseObject.message = "Something went wrong";
    responseObject.status = false;
    responseObject.status_code = 400;
    responseObject.data = [];
    return responseObject;
 }
}