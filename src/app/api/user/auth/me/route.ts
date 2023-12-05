import { NextResponse, NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { User } from "@/lib/models/user"
import CONNECTION from "@/lib/connection"

export const GET = async (req: NextRequest) => {
    try {
        const token =  req.headers.get("music_auth_token")
        if (!token) return NextResponse.json({ message: "Plese Login", success: false })
        const decode =  jwt.decode(token)
        await CONNECTION()
        // @ts-ignore
        const user = await User.findById(decode?.id)
        return NextResponse.json({ success: true, user })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false })
    }
} 