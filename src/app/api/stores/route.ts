import { NextRequest, NextResponse } from "next/server";
import  jwt, { JwtPayload }  from "jsonwebtoken";
import { getStores } from "@/services/getStores";
interface Store {
    _id: string;
    store_name: string;
    address: string;
    store_type: string;
    employee_number: string;
    gst_number: string;
    store_id: string;
    user_id: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
interface StoresResponse {
    status: boolean;
    message: string;
    status_code: number;
    data?: Store[];
}
export async function GET(req: NextRequest) {
    try {
        const token: string = req.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECUIRITY_KEY!) as JwtPayload;
        const response: StoresResponse = await getStores(verifyToken);
        if (response.status === false) {
            return NextResponse.json(response);
        }
        return NextResponse.json(response);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something wenrt wrong", error: error, status: false });
    }
}