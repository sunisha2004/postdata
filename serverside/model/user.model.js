import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type:String },
    email: { type: String },
    phone: { type: Number},
    pass: { type: String },
    pic:{ type:String },
})

export default mongoose.model.user||mongoose.model('user',userSchema)