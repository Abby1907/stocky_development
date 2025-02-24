import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import Store from "@/models/Store";
import mongoose from "mongoose";

interface StoreIDRequest {
    storeId: string | undefined;
}
interface StoreResponse {
    status: boolean;
    message: string;
    status_code: number;
    data?: {
        _id: string;
        store_id: string;
        store_name: string;
        store_type: string;
        employee_number: string;
        address: string;
        gst_number: string;
        isActive: boolean;
        user_id: string;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
    };
}

export async function getStore (storeId: StoreIDRequest): Promise<StoreResponse> {
    const responseObject: StoreResponse = {
        message: "",
        status: false,
        status_code: 400,
        data: undefined
    }
    try {
        await databaseConfiguration();
        const storeIdObject = new mongoose.Types.ObjectId(storeId.storeId);
        const storeDetails = await Store.findOne({_id: storeIdObject, isActive: true});
        if (!storeDetails) {
            responseObject.message = "Store not found";
            responseObject.status = false;
            responseObject.status_code = 400;
            return responseObject;
        }
        responseObject.message = "Store found";
        responseObject.status = true;
        responseObject.status_code = 200;
        responseObject.data = storeDetails;
        
        return responseObject;
    } catch (error) {
        console.log(error);
        responseObject.message = "Somthing went wrong !";
        responseObject.status = false;
        responseObject.status_code = 400;
        return responseObject;
        
    }
}