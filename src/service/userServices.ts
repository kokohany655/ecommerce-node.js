import { uploadImage } from "../middleware/uploadImageMiddleware";
import User from "../model/userModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory";

import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import sharp from 'sharp'
import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import ApiError from "../utils/ApiError";

export const uploadUserImage = uploadImage("profileImg")

export const resizeImage =expressAsyncHandler((req:Request ,res:Response ,next:NextFunction)=>{

    const filename =  `user-${uuidv4()}-${Date.now()}.jpeg`
    if(req.body.buffer){
        sharp(req?.file?.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({quality : 90})
        .toFile(`./src/upload/user/${filename}`)
        req.body.profileImg = filename
        
    }
    next()
})


export const getAllUser = getAll(User)

export const getUserById = getOne(User)

export const createUser = createOne(User)

export const updateUser =  expressAsyncHandler(async(req:Request ,res:Response , next:NextFunction):Promise<void>=>{
const {name ,slug , email , phone , profileImg} = req.body
        const document = await User.findByIdAndUpdate(
            {_id:req.params.id} ,
            { name,
             slug,
             email,
             phone,
             profileImg
            }
             , {new:true})
        if(!document){
            return next(new ApiError(`no ${User} found with this id` , 404))
        }
        res.status(200).json({data:document})
})

export const changePassword = expressAsyncHandler(async(req:Request , res:Response , next:NextFunction)=>{
    const document = await User.findByIdAndUpdate(
        {_id:req.params.id} ,
        { 
            password : await bcrypt.hash(req.body.password , 10),
            passwordChangeAt : Date.now()
        }
         , {new:true})
    if(!document){
        return next(new ApiError(`no ${User} found with this id` , 404))
    }
    res.status(200).json({data:document})
})


export const delelteUser = deleteOne(User)