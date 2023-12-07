import { NextResponse, NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { User } from "@/lib/models/user"
import CONNECTION from "@/lib/connection"
export const GET = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("music_auth_token")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.SECRETE_KEY!);

        await CONNECTION()
        // @ts-ignore
        const user = await User.findById(decodedToken.id)
        return NextResponse.json({ success: true, user })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false })
    }
}   