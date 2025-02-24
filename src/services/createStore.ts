import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import Store from "@/models/Store";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

interface RegisterRequest {
    storeName: string;
    address: string;
    storeType: string;
    employeeNumber: string;
    gstNumber: string;
    storeID: string;
}
interface ResponseObject {
    message: string;
    status: boolean;
    status_code: number;
}


export async function createStore (req: NextRequest, reqBodyData: RegisterRequest): Promise<ResponseObject> {
    const responseObject = {
        message: "",
        status: false,
        status_code: 400
    }
    try {
        await databaseConfiguration();
        const token: string = req.cookies.get("token")?.value || "";
        const verifyToken: JwtPayload = await jwt.verify(token, process.env.JWT_SECUIRITY_KEY!) as JwtPayload;
        const getUserID = new mongoose.Types.ObjectId(verifyToken.id);
        const isExsistsStore = await Store.findOne({store_id: reqBodyData.storeID});
        if (isExsistsStore) {
            responseObject.message = "Store already exists";
            responseObject.status = false;
            responseObject.status_code = 400;
            return responseObject;
        }
        const saveStore = await Store.create ({
            store_name: reqBodyData.storeName,
            address: reqBodyData.address,
            store_type: reqBodyData.storeType,
            employee_number: reqBodyData.employeeNumber,
            gst_number: reqBodyData.gstNumber,
            store_id: reqBodyData.storeID,
            user_id: getUserID
        });
        if (!saveStore) {
            responseObject.message = "Store not created";
            responseObject.status = false;
            responseObject.status_code = 400;
            return responseObject;
        }
        responseObject.message = "Store created successfully";
        responseObject.status = true;
        responseObject.status_code = 200;
        return responseObject;
    } catch (error) {
        console.log(error);
        responseObject.message = "Something went wrong";
        responseObject.status = false;
        responseObject.status_code = 400;
        return responseObject;
    }
}