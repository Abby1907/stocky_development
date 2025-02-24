import { getGenerateBillpage } from "@/services/getGenerateBillPage";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {
    try {
        const response = await getGenerateBillpage(req);
        if (response.status === false) {
            return NextResponse.json({message: response.message, status: response.status}); 
        }
        return NextResponse.json({ role: response.role, billTemplateData: response.data, message: response.message, status: response.status});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Internal server error!", status: false, statusCode: 500});
    }
}