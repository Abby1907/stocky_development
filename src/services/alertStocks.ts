import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import { NextRequest } from "next/server";
import jwt, { JwtPayload }  from "jsonwebtoken";
import mongoose from "mongoose";
import User from "@/models/User";
import Employee from "@/models/Employee";
import Product from "@/models/Product";
import AlertValue from "@/models/AlertValues";

export async function alertStocks(req: NextRequest) {
    const responseObject = {
        message: "",
        status: false,
        statusCode: 400,
        data: {},
        products: {},
        role: ""
    }
    try {
        await databaseConfiguration();
        const token: string = req.cookies.get("token")?.value || "";
        const employeeToken: string = req.cookies.get("employeeToken")?.value || "";
        const verifyToken = await jwt.verify(token, process.env.JWT_SECUIRITY_KEY!) as JwtPayload;
        const getUserId = new mongoose.Types.ObjectId(verifyToken.id);
        const getUserDetails = await User.findOne({ _id: getUserId }, { password: 0 });
        const alertValue = await AlertValue.findOne({createdBy: getUserId}, {value: 1});
        let role = "";
        if (employeeToken) {
            const verifyEmployeeToken = await jwt.verify(employeeToken, process.env.JWT_SECUIRITY_KEY!) as JwtPayload;
            const getEmployeeID = new mongoose.Types.ObjectId(verifyEmployeeToken.id);
            const employeeDetails = await Employee.findOne({ _id: getEmployeeID });
            role = employeeDetails?.role;
        }
        if (!employeeToken) {
            role = getUserDetails?.role;
        }
        if (!getUserDetails) {
            responseObject.message = "User not found !";
            responseObject.status = false;
            responseObject.statusCode = 400;
            responseObject.data = {};
            responseObject.role = "";
            return responseObject;
        }
        const alertProducts = await Product.aggregate([
            {
                $match: {
                    quantity: {
                        $lte: alertValue.value
                    }
                }
            },
            {
                $lookup: {
                    from: "stores",
                    localField: "storeId",
                    foreignField: "_id",
                    as: "storeDetails"
                }
            },
            {
                $unwind: "$storeDetails"
            },
            {
                $match: {
                    "storeDetails.user_id": getUserId
                }
            },
            {
                $project: {
                    _id: 1,
                    productName: 1,
                    quantity: 1,
                    "storeDetails.store_name": 1,
                    "storeDetails.address": 1
                }
            }
        ]);
        const structuredAlertProducts = alertProducts.map((product) => ({
            _id: product._id,
            productName: product.productName,
            quantity: product.quantity,
            storeName: product.storeDetails.store_name,
            address: product.storeDetails.address
        }))
        if (!alertProducts) {
            responseObject.message = "Products not found !";
            responseObject.status = false;
            responseObject.statusCode = 400;
            return responseObject;
        }
        responseObject.message = "User found !";
        responseObject.status = true;
        responseObject.statusCode = 200;
        responseObject.data = getUserDetails;
        responseObject.role = role;
        responseObject.products = structuredAlertProducts;
        return responseObject;
    } catch (error) {
        console.log(error);
        responseObject.message = "Internal Server Error !";
        responseObject.status = false;
        responseObject.statusCode = 500;
        return responseObject;
    }
}