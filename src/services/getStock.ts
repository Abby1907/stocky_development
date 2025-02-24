import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import Product from "@/models/Product";
import "@/models/User";
import mongoose from "mongoose";
import moment from "moment-timezone";

interface Product {
    _id: string
    productName: string
    quantity: number
    storeId: string
    updatedAt: string
    modifiedBy: string
}
export async function getStock (storeId: string) {
    const responseObject = {
        message: "",
        status: false,
        status_code: 400,
        data: [] as Product[],
    }
    try {
        await databaseConfiguration();
        const getProducts = await Product.find({storeId: new mongoose.Types.ObjectId(storeId)})
        .populate({
            path: "modifiedBy",
            select: "name",
        });
        if (!getProducts) {
            responseObject.message = "Products not found !";
            responseObject.status = false;
            responseObject.status_code = 400;
            return responseObject;
        }
        const modifiedGetStocks = getProducts.map((product) => {
            return {
                _id: product._id,
                productName: product.productName,
                quantity: product.quantity,
                storeId: product.storeId,
                updatedAt: new Date(product.updatedAt).toISOString().split("T")[0],
                updatedAtTime: moment(product.updatedAt).tz('Asia/Kolkata').format('HH:mm:ss A'),
                modifiedBy: product.modifiedBy ? product?.modifiedBy?.name : "N/A",
            }
        })
        responseObject.message = "Products found !";
        responseObject.status = true;
        responseObject.status_code = 200;
        responseObject.data = modifiedGetStocks;
        return responseObject;
    } catch (error) {
        console.log(error);
        responseObject.message = "Something went wrong !";
        responseObject.status = false;
        responseObject.status_code = 400;
        return responseObject;
    }
}