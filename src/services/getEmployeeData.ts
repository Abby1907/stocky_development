import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import Employee from "@/models/Employee";
import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";

export async function getEmployeeData (req: NextRequest) {
    const responseObject = {
        message: "",
        status: false,
        statusCode: 400,
        data: {}
    }
    try {
        await databaseConfiguration();
        const token: string = req.cookies.get("token")?.value || "";
        const verifyToken = await jwt.verify(token, process.env.JWT_SECUIRITY_KEY!) as JwtPayload;
        const getUserID = new mongoose.Types.ObjectId(verifyToken.id);
        const getEmployeeDetails = await Employee.find({createdBy: getUserID}, {email: 1, role: 1, isActive: 1});
        if (!getEmployeeDetails) {
            responseObject.message = "Employee details not found";
            responseObject.status = false;
            responseObject.statusCode = 400;
            return responseObject;
        }
        responseObject.message = "Employee details found";
        responseObject.status = true;
        responseObject.statusCode = 200;
        responseObject.data = getEmployeeDetails;
        return responseObject;
    } catch (error) {
        console.log(error);
        responseObject.message = "Internal server error";
        responseObject.status = false;
        responseObject.statusCode = 500;
        return responseObject;
    }
}