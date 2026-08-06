import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        unique:[true,"username is already taken"],
        required:true
    },

    email:{
        type:String,
        unique:[true,"Account already exists with this email"],
        required:true
    },

    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model('users',userSchema);

export {userModel};