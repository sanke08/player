import jwt from "jsonwebtoken"
import { File } from "../models/file"
import { User } from "../models/user"
import CONNECTION from "../connection"
export const getSongsByUserId = async (id: string) => {
    try {
        await CONNECTION()
        // const decodedToken: any = jwt.verify(token, process.env.SECRETE_KEY!);
   
        const user = await User.findById(id)
        if (!user) return
        const songs = await File.find({ user: user._id })
        return songs
    } catch (error: any) {
        console.log(error)
        return null
    }
}