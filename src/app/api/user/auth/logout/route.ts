import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        await cookies().delete("music_auth_token")
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false })

    }

}