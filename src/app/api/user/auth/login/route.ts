import CONNECTION from "@/lib/connection";
import { User } from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { cookies } from "next/headers"




export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { email, password } = data
        if (!email || !password) throw new Error("Please enter all required Fields")
        await CONNECTION()
        const user = await User.findOne({ email: email })
        if (!user) throw new Error("Couldn't find")
        const matchPassword = await bcryptjs.compare(password, user.password)
        if (!matchPassword) throw new Error("invalid credentials")
        const token = await jwt.sign({ id: user._id }, process.env.SECRETE_KEY!)
        cookies().set("music_auth_token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true, secure: true })
        return NextResponse.json({ user, message: "loggedin Successfully", success: true })
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 })
    }
}