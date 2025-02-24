import { NextRequest, NextResponse } from "next/server";
import { createStore } from "@/services/createStore";

interface ResponseObject {
    message: string;
    status: boolean;
    status_code: number;
}
export async function POST (req: NextRequest) {
    try {
        const reqBody = await req.json();
        const response: ResponseObject = await createStore(req, reqBody);
        if (response.status === false) {
            return NextResponse.json({message: response.message, status: response.status});
        }
        return NextResponse.json({message: response.message, status: response.status});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something went wrong !", error: error, status: false});
    }
}