import CONNECTION from "@/lib/connection"
import { NextRequest, NextResponse } from "next/server"
import { File } from "@/lib/models/file"
import { User } from "@/lib/models/user"
import { getAuthSession } from "@/lib/auth"

export const dynamic ="force-static"
export const POST = async (req: NextRequest) => {
    try {
        await CONNECTION()
        const { file, image, fileName, artistName } = await req.json()
        if (!file || !image || !fileName || !artistName) {
            throw new Error("Please Enter All fields")
        }
        const session =await getAuthSession()
        if (!session) return NextResponse.json({ message: "please login", success: false })
        // @ts-ignore
            const user = await User.findById(session?.user?.id)
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