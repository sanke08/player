import jwt from "jsonwebtoken"
import { File } from "../models/file"
import { User } from "../models/user"
import CONNECTION from "../connection"
export const getSongsByUserId = async (token: string) => {
    try {
        await CONNECTION()
        const decodedToken: any = jwt.verify(token, process.env.SECRETE_KEY!);
        console.log(decodedToken)
        const user = await User.findById(decodedToken.id)
        if (!user) return
        const songs = await File.find({ user: user._id })
        return songs
    } catch (error: any) {
        console.log(error)
        return null
    }
}