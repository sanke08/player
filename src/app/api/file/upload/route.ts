import CONNECTION from "@/lib/connection"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { File } from "@/lib/models/file"
import { User } from "@/lib/models/user"


export const POST = async (req: NextRequest) => {
    try {
        await CONNECTION()
        const { file, image, fileName, artistName } = await req.json()
        if (!file || !image || !fileName || !artistName) {
            throw new Error("Please Enter All fields")
        }
        const token = req.headers.get("Authorization");
        if (!token) return NextResponse.json({ message: "please login", success: false })
        const decode:any = jwt.decode(token);
            const user = await User.findById(decode?.id)
            if (user) {
                const songg = await File.create({ title: fileName, author: artistName, image, song: file, user: user?.id })
                if (!songg) {
                    throw new Error("File noot created")
                }
                return NextResponse.json({ success: true, message: "File created successfully", file: file })
            }
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message, })
    }
}