import jwt from "jsonwebtoken"
import { File } from "../models/file"
import { User } from "../models/user"
import CONNECTION from "../connection"
export const getSongsByUserId = async (token: any) => {
    try {
        await CONNECTION()
        const decode = await jwt.decode(token.value)
        // @ts-ignore
        const user = await User.findById(decode?.id)
        if (!user) return
        const songs = await File.find({ user: user._id })
        return  songs 
    } catch (error:any) {
        console.log(error)
        return null
    }
}