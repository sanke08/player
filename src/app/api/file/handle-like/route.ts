import CONNECTION from "@/lib/connection";
import { File } from "@/lib/models/file";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { User } from "@/lib/models/user";
import { getAuthSession } from "@/lib/auth";

export const PUT = async (req: NextRequest) => {
    try {
        await CONNECTION()
        const { songId } =await req.json()
        if (!songId) {
            return NextResponse.json({ message: "no ID provided" })
        }
        const song = await File.findById(songId)
        if (!song) {
            return NextResponse.json({ message: "No song With id : " + songId })
        }
        const session= await getAuthSession()
        if (!session) return NextResponse.json({ message: "Plese Login", success: false })
        // @ts-ignore
        const user = await User.findById(session?.user?.id)
        if (!user) return NextResponse.json({ message: "Please login", success: false })

        if (!user.liked.includes(songId)) {
            await User.findByIdAndUpdate(user._id, { $push: { liked: songId } }, { new: true })
            return NextResponse.json({ success: true,  message: "Add to Like Playlist" })
        } else {
            await User.findByIdAndUpdate(user._id, { $pull: { liked: songId } }, { new: true })
            return NextResponse.json({ success: true,  message: "Removed from Like Playlist" })
        }

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })

    }
}