import CONNECTION from "@/lib/connection";
import { User } from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { cookies } from "next/headers"




export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { email, password, name } = data
        if (!email || !password || !name) throw new Error("Please enter all required Fields")
        await CONNECTION()
        const existUser = await User.findOne({ email: email })
        if (existUser) throw new Error("User Already Exists")
        const user = await User.create({ email, name, password })
        const token = await jwt.sign({ id: user._id }, process.env.SECRETE_KEY!)
        const response = NextResponse.json({ user, message: "Register Successfully", success: true })
        response.cookies.set("music_auth_token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true, secure: true })
        return response
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 })
    }
}