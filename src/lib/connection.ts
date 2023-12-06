import mongoose from "mongoose"
let connect=false
const CONNECTION=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`,{
            dbName:"spotify-clone",
        })
        console.log("Connected")
        connect=true
    } catch (error) {
        console.log(error)
        return error
    }
}

export default CONNECTION
