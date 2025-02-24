import { employeeLogin } from "@/services/employeeLogin";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface ResponseObject {
    message: string;
    status: boolean;
    status_code: number;
    data?: Data;
    employeeData?: Data
}
interface Data {
    _id: string
}

export async function POST (req: NextRequest) {
    try {
        const reqBody = await req.json();
        const response: ResponseObject = await employeeLogin(reqBody);
        if (response.status === false) {
            return NextResponse.json({message: response.message, status: response.status});
        }
        const responseWithCookie = NextResponse.json({
            message: response.message,
            status: response.status,
        });
        if (response.status === true && response.data) {
            const token = jwt.sign({
                id: response.data._id
            },
            process.env.JWT_SECUIRITY_KEY!, {
                expiresIn: "1h"
            });
            const employeeToken = jwt.sign({
                id: response.employeeData?._id
            },
            process.env.JWT_SECUIRITY_KEY!, {
                expiresIn: "1h"
            });
            responseWithCookie.cookies.set({
                name: "token",
                value: token,
                httpOnly: true,
                maxAge: 3600, // 1 hour
                secure: true,
                sameSite: "lax",
                path: "/",
                domain: process.env.NODE_ENV === "production" ? "stocky-five.vercel.app" : "localhost"
            });
            responseWithCookie.cookies.set({
                name: "employeeToken",
                value: employeeToken,
                httpOnly: true,
                maxAge: 3600, // 1 hour
                secure: true,
                sameSite: "lax",
                path: "/",
                domain: process.env.NODE_ENV === "production" ? "stocky-five.vercel.app" : "localhost"
            });
        }
        return responseWithCookie;
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something wenrt wrong", error: error, status: false});
    }
}