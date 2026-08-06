import jwt from 'jsonwebtoken';
import { blacklistModel } from '../models/blacklist.model.js';



export const authUser =async  (req, res, next)=>{

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message:"token not provided"})
    }

    const istokenBlacklisted =  await blacklistModel.findOne({token})
    if(istokenBlacklisted){
        return res.status(401).json({
            message:"Session Timeout. Please login again"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()

    }catch(e){
        return res.status(401).json({message:"Invaid token"})
    }
    
}

