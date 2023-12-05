import  mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    imagepath: { type: String, required: true },
    song: { type: String, required: true },
    songpath: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

})

export const File = mongoose.models.file || mongoose.model("file", fileSchema)
 