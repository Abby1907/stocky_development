import { alertStocks } from "@/services/alertStocks";
import { NextRequest, NextResponse } from "next/server";


export async function GET (req: NextRequest) {
    try {
        const response = await alertStocks(req);
        if (response?.status === false) {
            return NextResponse.json({message: response?.message, status: response?.status, statusCode: response?.statusCode, data: response?.data});
        }
        return NextResponse.json({message: response?.message, status: response?.status, statusCode: response?.statusCode, data: response?.data, role: response?.role, alertProducts: response?.products});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something wenrt wrong", error: error, status: false});
    }
}