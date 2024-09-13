import { dbConnect } from "@/lib/dbconnect";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return NextResponse.json({
                error: "Email already exists",
            },
            { status: 400 }  // Return HTTP 400 on email already exists)
        )}

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();
        console.log(savedUser);
        
        // send verification email

        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id,
        })

        return NextResponse.json({
            message: "User registered successfully",
            success : true,
            user: savedUser,
        })

    } catch (error) {
        return NextResponse.json({
            error: error.message,
        },
    { status: 500 }  // Return HTTP 500 on error)
    )}
}