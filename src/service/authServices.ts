import { NextFunction, Request, Response } from "express";
import User from "../model/userModel";

import expressAsyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import ApiError from "../utils/ApiError";
import { jsonwebtoken } from "../interfaces/Jwt";

const generateToken = (payload:string)=> jwt.sign({userId : payload} , `${process.env.JWT_SECRET}` , {expiresIn : process.env.JWT_EXPIRE_DATE} )


export const signup = expressAsyncHandler(async(req:Request , res:Response)=>{
    const user =new User({
        name : req.body.name,
        email  : req.body.email,
        password : req.body.password
    })
    await user.save()
    const token = generateToken(String(user._id))
    res.status(200).send({data:user , token})
})

export const login = expressAsyncHandler(async(req:Request , res:Response , next:NextFunction)=>{
    const user =await  User.findOne({email : req.body.email})
    
    if(user){
        const correctPassword = bcrypt.compare(req.body.password , String(user.email))
        if(!correctPassword){
            return next(new ApiError('incorrect password' , 400))
        }
    const token = generateToken(String(user._id))
    res.status(200).send({data:user , token})
    }
    
})

export const protect = expressAsyncHandler(async(req:Request , res:Response , next:NextFunction)=>{
    let token ;
   
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    
    if(!token){
        return next(new ApiError('you are not login' , 401))
    }
    
    const {userId , iat} = jwt.verify(token , String(process.env.JWT_SECRET)) as jsonwebtoken
   
    const currentUser = await User.findById(userId)
    if(!currentUser){
        return next('the user whos belong to this token no longer exist')
    }

    if(currentUser.passwordChangeAt){
            const passwordChangeTimestamp = parseInt( String((currentUser.passwordChangeAt.getTime() / 1000) as unknown) ,10)
            if(passwordChangeTimestamp > iat){
                return next ( new ApiError ('your password change try login again',401))
            }
    }
    req.user = currentUser
    next()
})

export const allowTo = (...roles:string[]) => {
    return expressAsyncHandler(async(req:Request , res:Response , next:NextFunction)=>{
            console.log(roles)
            if(!roles.includes(req?.user?.role)){
                
                return next(new ApiError(`${roles} who only have access ` , 403))
            }
            next()
    })
    
}
