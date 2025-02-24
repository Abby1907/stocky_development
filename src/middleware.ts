import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
export async function middleware (req: NextRequest) {
    try {
        const secretKey = new TextEncoder().encode(process.env.JWT_SECUIRITY_KEY!);
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            console.log("no token");
            return NextResponse.redirect(new URL("/login", req.url));
        }
        await jwtVerify(token, secretKey);
        return NextResponse.next();
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL("/login", req.url));        
    }
}
export const config = {
    matcher: ["/dashboard", "/create-store", "/stores", "/create-employees", "/stock-alerts", "/employee-details", "/generate-bill"],
  };