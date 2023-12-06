import { NextResponse, NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { User } from "@/lib/models/user"
import CONNECTION from "@/lib/connection"
import { getAuthSession } from "@/lib/auth"

export const GET = async (req: NextRequest) => {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ message: "Plese Login", success: false })

        await CONNECTION()
        // @ts-ignore
        const user = await User.findById(session?.user?.id)
        return NextResponse.json({ success: true, user })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false })
    }
}   