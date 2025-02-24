import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import BillTemplate from "@/models/BillTemplate";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

type reqBodyType = {
    companyName: String,
    companyGstin: String,
    companyAddress: String,
    prefixBillNumber: String
}
export async function createBillTemplate(req: NextRequest, reqBody: reqBodyType) {
    const responseObj = {
        message: "",
        status: false,
        statusCode: 400,
    }
    try {
        await databaseConfiguration();
        const token: string = req.cookies.get("token")?.value || "";
        const verifyToken = await jwt.verify(token, process.env.JWT_SECUIRITY_KEY!) as JwtPayload;
        const getUserID = new mongoose.Types.ObjectId(verifyToken.id);
        if (!reqBody.companyName || !reqBody.companyGstin || !reqBody.companyAddress) {
            responseObj.message = "Company name, GST number, Company address is required !"
            responseObj.status = false
            responseObj.statusCode = 400
            return responseObj;
        }
        const saveBillTemplate = await BillTemplate.create({
            companyName: reqBody.companyName,
            companyGstNumber: reqBody.companyGstin,
            companyAddress: reqBody.companyAddress,
            invoicePreFix: reqBody.prefixBillNumber,
            createdBy: getUserID
        })
        if (!saveBillTemplate) {
            responseObj.message = "Error to save bill template!";
            responseObj.status = false;
            responseObj.statusCode = 400;
            return responseObj;
        }
        responseObj.message = "Bill template saved successfully.";
        responseObj.status = true;
        responseObj.statusCode = 200;
        return responseObj;
    } catch (error) {
        console.log(error);
        responseObj.message = "Internal Server error!";
        responseObj.status = false;
        responseObj.statusCode = 500;
        return responseObj;
    }
}