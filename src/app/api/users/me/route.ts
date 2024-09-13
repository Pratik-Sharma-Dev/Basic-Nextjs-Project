import { dbConnect } from "@/lib/dbconnect";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(request: NextRequest) {
    await dbConnect();
    // Extract data from token
    const userId = await getDataFromToken(request);
    const userData = await User.findOne({_id: userId}).select("-password");
    
    // Check if user exists
    if (!userData) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
        message : "User Found",
        data : userData
    })
}