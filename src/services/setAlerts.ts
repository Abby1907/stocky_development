import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import AlertValue from "@/models/AlertValues";

type reqBodyType = {
    value: number
}
export async function setAlerts(req: NextRequest, reqBody: reqBodyType) {
    const responseobject = {
        message: "",
        status: false,
        statusCode: 400
    }
    try {
        await databaseConfiguration();
        const token: string = req.cookies.get("token")?.value || "";
        const verifyToken = await jwt.verify(token, process.env.JWT_SECUIRITY_KEY!) as JwtPayload;
        const getUserID = new mongoose.Types.ObjectId(verifyToken.id);
        const isExsistsAlertValue = await AlertValue.findOne({ createdBy: getUserID });
        if (isExsistsAlertValue) {
            const updateAlertValue = await AlertValue.findOneAndUpdate({ createdBy: getUserID }, { value: reqBody.value }, { new: true });
            if (!updateAlertValue) {
                responseobject.message = "Alert value not updated";
                responseobject.status = false;
                responseobject.statusCode = 400;
                return responseobject;
            } else {
                responseobject.message = "Alert value updated successfully";
                responseobject.status = true;
                responseobject.statusCode = 200;
                return responseobject;
            }
        }
        const saveAlertValue = await AlertValue.create({
            value: reqBody.value,
            createdBy: getUserID
        });
        if (!saveAlertValue) {
            responseobject.message = "Alert value not saved";
            responseobject.status = false;
            responseobject.statusCode = 400;
            return responseobject;
        } else {
            responseobject.message = "Alert value saved successfully";
            responseobject.status = true;
            responseobject.statusCode = 200;
            return responseobject;
        }
    } catch (error) {
        console.log(error);
        responseobject.message = "Internal server error";
        responseobject.status = false;
        responseobject.statusCode = 500;
        return responseobject;
    }
}