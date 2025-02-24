import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import Store from "@/models/Store";
import Product from "@/models/Product";
import Employee from "@/models/Employee";
import User from "@/models/User";
import AlertValue from "@/models/AlertValues";

export async function getUserData(req: NextRequest) {
    const responseObject = {
        message: "",
        status: false,
        statusCode: 400,
        stores: {},
        products: {},
        alertProducts: {},
        alertValue: 0,
        employees: {},
        role: ""
    }
    try {
        await databaseConfiguration();
        const token: string = req.cookies.get("token")?.value || "";
        const employeeToken: string = req.cookies.get("employeeToken")?.value || "";
        const verifyToken = await jwt.verify(token, process.env.JWT_SECUIRITY_KEY!) as JwtPayload;
        const getUserID = new mongoose.Types.ObjectId(verifyToken.id);
        const userDetails = await User.findOne({ _id: getUserID });
        const alertValue = await AlertValue.findOne({ createdBy: getUserID }, { value: 1 });
        let role = "";
        if (employeeToken) {
            const verifyEmployeeToken = await jwt.verify(employeeToken, process.env.JWT_SECUIRITY_KEY!) as JwtPayload;
            const getEmployeeID = new mongoose.Types.ObjectId(verifyEmployeeToken.id);
            const employeeDetails = await Employee.findOne({ _id: getEmployeeID });
            role = employeeDetails?.role;
        }
        if (!employeeToken) {
            role = userDetails?.role;
        }
        const stores = await Store.find({ user_id: getUserID });
        if(!stores) {
            responseObject.message = "No stores found";
            responseObject.status = false;
            responseObject.statusCode = 400;
            responseObject.stores = {};
            return responseObject;
        }
        const storeIds = stores.map((store) => store._id);
        const products = await Product.find({ storeId: { $in: storeIds } });
        if(!products) {
            responseObject.message = "No products found";
            responseObject.status = false;
            responseObject.statusCode = 400;
            responseObject.products = {};
            responseObject.alertProducts = {};
            return responseObject;
        }
        const alertProducts = products.filter((product) => product.quantity <= alertValue?.value);
        const employees = await Employee.find({createdBy: getUserID});
        if (!employees) {
            responseObject.message = "No employees found";
            responseObject.status = false;
            responseObject.statusCode = 400;
            return responseObject;
        }
        responseObject.message = "Fetched data successfully!";
        responseObject.status = true;
        responseObject.statusCode = 200;
        responseObject.stores = stores;
        responseObject.products = products;
        responseObject.alertProducts = alertProducts;
        responseObject.alertValue = alertValue?.value;
        responseObject.employees = employees;
        responseObject.role = role;
        return responseObject;
        
    } catch (error) {
        console.log(error);
        responseObject.message = "Error occured while stock in !";
        responseObject.status = false;
        responseObject.statusCode = 400;
        return responseObject;
    }
}