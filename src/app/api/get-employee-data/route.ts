import { getEmployeeData } from "@/services/getEmployeeData";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {
    try {
        const response = await getEmployeeData(req);
        if (response.status === false) {
            return NextResponse.json({message: response.message, status: response.status});
        }
        return NextResponse.json({data: response.data, message: response.message, status: response.status});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something wenrt wrong", error: error, status: false});
    }
}