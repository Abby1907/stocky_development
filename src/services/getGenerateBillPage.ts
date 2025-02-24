import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import User from "@/models/User";
import Employee from "@/models/Employee";
import BillTemplate from "@/models/BillTemplate";

export async function getGenerateBillpage (req: NextRequest) {
    const responseObj = {
        message: "",
        status: false,
        statusCode: 400,
        data: {},
        role: ""
    }
    try {
        await databaseConfiguration();
        const token = req.cookies.get("token")?.value || "";
        const employeeToken = req.cookies.get("employeeToken")?.value || "";
        const verifyToken = await jwt.verify(token, process.env.JWT_SECUIRITY_KEY!) as JwtPayload;
        const getUserID = new mongoose.Types.ObjectId(verifyToken.id);
        const getUserDetails = await User.findOne({ _id: getUserID }, { role: 1 });
        let role = "";
        if (employeeToken) {
            const verifyEmployeeToken = await jwt.verify(employeeToken, process.env.JWT_SECUIRITY_KEY!) as JwtPayload;
            const getEmployeeId = new mongoose.Types.ObjectId(verifyEmployeeToken.id);
            const employeeDetails = await Employee.findOne({ _id: getEmployeeId }, { role: 1 });
            role = employeeDetails?.role;
        }
        if (!employeeToken) {
            role = getUserDetails?.role;
        }
        const getBillTemplateDetails = await BillTemplate.find({ createdBy: getUserID}, { companyName: 1, companyGstNumber: 1, _id: 1});
        if (getBillTemplateDetails) {
            responseObj.data = getBillTemplateDetails;
        }
        
        responseObj.message = "Data fetched successfully.";
        responseObj.status = true;
        responseObj.statusCode = 200;
        responseObj.role = role;
        return responseObj;
    } catch (error) {
        console.log(error);
        responseObj.message = "Internal server error !";
        responseObj.status = false;
        responseObj.statusCode = 500;
        return responseObj;
    }
}