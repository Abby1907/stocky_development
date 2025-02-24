import { getStore } from "@/services/getStore";
import { NextRequest, NextResponse } from "next/server";


interface StoreResponse {
    status: boolean;
    message: string;
    status_code: number;
    data?: {
        _id: string;
        store_id: string;
        store_name: string;
        store_type: string;
        employee_number: string;
        address: string;
        gst_number: string;
        isActive: boolean;
        user_id: string;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
    };
}

export async function GET (req: NextRequest) {
    try {
        const {  pathname } = req.nextUrl;
        const storeId: string | undefined = pathname.split("/").pop();
        const response: StoreResponse = await getStore({ storeId: storeId ?? "" });
        if (response.status === false) {
            return NextResponse.json({message: response.message, status: response.status});
        }
        return NextResponse.json({data: response.data, message: response.message, status: response.status});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something wenrt wrong", error: error, status: false});
    }
}