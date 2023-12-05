import CONNECTION from "@/lib/connection";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { User } from "@/lib/models/user";

export const GET = async (req: NextRequest) => {
    try {
        const token =  req.headers.get("Authorization");
        if (!token) return NextResponse.json({ message: "please login", success: false })
        const decode =  jwt.decode(token);
        await CONNECTION()
        // @ts-ignore
        const user = await User.findById(decode?.id).populate({path:"liked"})
        return NextResponse.json({ songs: user.liked })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false })
    }
}