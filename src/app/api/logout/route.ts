import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    try {    
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: "lax",
            path: "/",
            domain: process.env.NODE_ENV === "production" ? "stocky-five.vercel.app" : "localhost"
        });
        response.cookies.set("employeeToken", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: "lax",
            path: "/",
            domain: process.env.NODE_ENV === "production" ? "stocky-five.vercel.app" : "localhost"
        });
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something wenrt wrong", error: error, status: false});
    }
}