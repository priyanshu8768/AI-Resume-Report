import {userModel} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { blacklistModel } from '../models/blacklist.model.js';

const registerUser = async (req,res)=>{

    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    const isUserExist = await userModel.findOne({$or:[{username},{email}]});

    if(isUserExist){
        return res.status(400).json({message:"User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new userModel({
        username,
        email,
        password:hashedPassword
    });
    await newUser.save();

    const token = jwt.sign({id:newUser._id, username:newUser.username},process.env.JWT_SECRET,{expiresIn:'1d'});

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({message:"User registered successfully",
        newUser: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    });

}


const loginUser = async (req,res)=>{
    const {email,password}=req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({message:"Invalid email or password"});
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid email or password"});
    }

    const token = jwt.sign({id:user._id, username:user.username},process.env.JWT_SECRET,{expiresIn:'1d'});

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({message:"User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

}


const logoutUser = async (req,res)=>{
    const token = req.cookies.token;

    if(token){
        await blacklistModel.create({token})
    }

    res.clearCookie('token', {
        sameSite: 'none',
        secure: true,
    });

    res.status(200).json({message:"user logout successfully"})

}


const getmeUser=async (req, res)=>{

    const user = await userModel.findById(req.user.id)  
    
    res.status(200).json({
        message:"user data fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

export {registerUser, loginUser , logoutUser , getmeUser};