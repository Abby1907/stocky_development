import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface requestBodyType {
    productId: string
    quantity: number
}
export async function stockIn (req: NextRequest, reqBody: requestBodyType) {
    const responseObject = {
        message: "",
        status: false,
        statusCode: 400,
    }
    try {
        await databaseConfiguration();
        const token: string = req.cookies.get("token")?.value || "";
        const verifyToken = await jwt.verify(token, process.env.JWT_SECUIRITY_KEY!) as JwtPayload;
        const getUserID = new mongoose.Types.ObjectId(verifyToken.id);
        const updateStock = await Product.findOneAndUpdate({_id: new mongoose.Types.ObjectId(reqBody.productId)}, {$inc: {quantity: reqBody.quantity}, updatedAt: new Date(), modifiedBy: getUserID},{new: true});
        if (!updateStock) {
            responseObject.message = "Stock not updated !";
            responseObject.status = false;
            responseObject.statusCode = 400;
            return responseObject;
        }
        responseObject.message = "Stock updated successfully !";
        responseObject.status = true;
        responseObject.statusCode = 200;
        return responseObject;
    } catch (error) {
        console.log(error);
        responseObject.message = "Error occured while stock in !";
        responseObject.status = false;
        responseObject.statusCode = 400;
        return responseObject;
    }
}