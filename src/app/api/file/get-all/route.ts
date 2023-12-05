import CONNECTION from "@/lib/connection"
import { File } from "@/lib/models/file"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        await CONNECTION()
        const songs = await File.aggregate([
            { $sample: { size: 20 } },
        ])
        return NextResponse.json({ songs })
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}