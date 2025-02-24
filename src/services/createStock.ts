import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import Product from "@/models/Product";
import mongoose from "mongoose";

interface reqBodyType {
    productName: string,
    productQuantity: number,
    storeID: string
}
interface ResponseObject {
    message: string;
    status: boolean;
    statusCode: number;
}
export async function createStock (reqBody: reqBodyType): Promise<ResponseObject> {
    const responseObject: ResponseObject = {
        message: "",
        status: false,
        statusCode: 400
    }
    try {
        await databaseConfiguration();
        const savedStock = await Product.create({
            productName: reqBody.productName,
            quantity: reqBody.productQuantity,
            storeId: new mongoose.Types.ObjectId(reqBody.storeID),
        });
        if(!savedStock) {
            responseObject.message = "Stock not created";
            responseObject.status = false;
            responseObject.statusCode = 400;
            return responseObject;
        }
        responseObject.message = "Stock created successfully";
        responseObject.status = true;
        responseObject.statusCode = 200;
        return responseObject;
    } catch (error) {
        console.log(error);
        responseObject.message = "Something wenrt wrong";
        responseObject.status = false;
        responseObject.statusCode = 400;
        return responseObject;
    }
}