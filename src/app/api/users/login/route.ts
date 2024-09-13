import { dbConnect } from "@/lib/dbconnect";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { sendEmail } from "@/helpers/mailer";

export async function POST(request : NextRequest){
    try {
        await dbConnect();
        const reqBody = await request.json();
        const {email, password} : any = reqBody;
        const user = await User.findOne({ email });

        if(!user){
            return NextResponse.json({
                error: "User not found",
            }, {
                status: 400,
            })
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json({
                error: "Check your credentials",
            }, {
                status: 400,
            })
        }

        const tokenData = {
            id: user._id,
            username : user.username,
            email : user.email
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        const response =  NextResponse.json({
            message: "Logged in successfully",
            success : true,
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;


    } catch (error) {
        return NextResponse.json({
            error: error.message,
        },
    { status: 500 } 
    )}
}