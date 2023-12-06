
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String},
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "file", }],
}, {
    timestamps: true
})

export const User = mongoose.models.user || mongoose.model("user", userSchema)
