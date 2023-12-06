import CONNECTION from "@/lib/connection";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/lib/models/user";
import { getAuthSession } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ message: "Plese Login", success: false })
        await CONNECTION()
        // @ts-ignore
        const user = await User.findById(session?.user.id).populate({ path: "liked" })
        return NextResponse.json({ songs: user.liked })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false })
    }
}