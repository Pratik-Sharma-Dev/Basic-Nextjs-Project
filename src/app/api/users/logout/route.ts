import { dbConnect } from "@/lib/dbconnect";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await dbConnect()
        const response = NextResponse.json({
            message : "Logout Successfully",
            sucess : true
        },
    {
        status: 200
    })

    response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0), // Expire the cookie immediately
    })

    return response;

    } catch (error) {
        return NextResponse.json({
            error: error.message,
            statusCode: 500
        })
    }
}