import CONNECTION from "@/lib/connection";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/lib/models/user";
import jwt from "jsonwebtoken"

export const GET = async (req: NextRequest) => {
    try {
        const token = req.headers.get("Authorization") ||""
        const decodedToken: any = jwt.verify(token, process.env.SECRETE_KEY!);
        if (!decodedToken) return NextResponse.json({ message: "Plese Login", success: false })
        await CONNECTION()
        // @ts-ignore
        const user = await User.findById(decodedToken.id).populate({ path: "liked" })
        return NextResponse.json({ songs: user.liked })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false })
    }
}