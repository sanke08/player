import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const response =NextResponse.json({ success: true })
        response.cookies.set("music_auth_token", "", { httpOnly: true, expires: new Date(0) })
        return response
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}