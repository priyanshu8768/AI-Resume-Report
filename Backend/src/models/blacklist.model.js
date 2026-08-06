import mongoose,{Schema} from "mongoose";

const blacklistSchema = new Schema({
    token:{
        type:String,
        required:[true,"Token is required"]
    }
},{
    timestamps:true
})

const blacklistModel = mongoose.model('blacklistTokens',blacklistSchema);

export {blacklistModel};

