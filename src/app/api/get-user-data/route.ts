import { getUserData } from "@/services/getUserData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = await getUserData(req);
        if (response.status === false) {
            return NextResponse.json({message: response.message, status: response.status});
        }
        return NextResponse.json({stores: response.stores, products: response.products, alertProducts: response.alertProducts, alertValue: response.alertValue, employees: response.employees, role: response.role, message: response.message, status: response.status});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something wenrt wrong", error: error, status: false});
    }
}