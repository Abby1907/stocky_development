import { activateEmployee } from "@/services/activateEmployee";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    try {
        const reqBody = await req.json();
        const response = await activateEmployee(reqBody);
        if (response.status === false) {
            return NextResponse.json({message: response.message, status: response.status});
        }
        return NextResponse.json({message: response.message, status: response.status});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something wenrt wrong", error: error, status: false});
    }
}