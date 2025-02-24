import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import Employee from "@/models/Employee";
import User from "@/models/User";
import mongoose from "mongoose";
import Store from "@/models/Store";

interface RequestBody {
    employeeEmail: string,
    employeePassword: string,
    employeeRole: string
}
export async function createEmployees (req: NextRequest, reqBody: RequestBody) {
    const responseObject = {
        message: "",
        status: false,
        status_code: 400
    }
    try {
        await databaseConfiguration();
        const token = req.cookies.get("token")?.value || "";
        const verifyToken = await jwt.verify(token, process.env.JWT_SECUIRITY_KEY!) as JwtPayload;
        const getUserID = new mongoose.Types.ObjectId(verifyToken.id);
        const rootUserDetails = await User.findOne({ _id: getUserID });
        if (rootUserDetails.email === reqBody.employeeEmail) {
            responseObject.message = "You cannot create an employee with same email of root user";
            responseObject.status = false;
            responseObject.status_code = 400;
            return responseObject;
        }
        const stores = await Store.find({ user_id: getUserID });
        const storeIds = stores.map((store) => store._id);
        const isExsistEmployee = await Employee.findOne({email: reqBody.employeeEmail});
        if (isExsistEmployee) {
            responseObject.message = "Employee already exists";
            responseObject.status = false;
            responseObject.status_code = 400;
            return responseObject;
        }
        const saveEmployee = await Employee.create ({
            email: reqBody.employeeEmail,
            password: reqBody.employeePassword,
            role: reqBody.employeeRole,
            storeIds: storeIds,
            isActive: true,
            createdBy: getUserID,
            createdAt: new Date(Date.now()),
        })
        if (!saveEmployee) {
            responseObject.message = "Employee not created !";
            responseObject.status = false;
            responseObject.status_code = 400;
            return responseObject;
        }
        responseObject.message = "Employee created successfully !";
        responseObject.status = true;
        responseObject.status_code = 200;
        return responseObject;
        
    } catch (error) {
        console.log(error);
        responseObject.message = "Internal server error !";
        responseObject.status = false;
        responseObject.status_code = 500;
        return responseObject;
    }
}