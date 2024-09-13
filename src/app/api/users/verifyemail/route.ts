import { dbConnect } from "@/lib/dbconnect";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const {token} = reqBody;
        const user = await User.findOne({
            verifyToken : token,
            verifyTokenExpiry : {$gt: Date.now()}
        });

        if(!user){
            return NextResponse.json({
                error: "Invalid token",
            },
        {
            status: 400, 
        })
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "User verified successfully",
            success: true,
        }, {
            status: 200,  // Return HTTP 200 on success
        })

    } catch (error) {
        return NextResponse.json({
            error: error.message,
        },
    {
        status: 500, // Return HTTP 500 on server error
    })
    }
}