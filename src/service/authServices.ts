import crypto, { verify } from 'crypto'

import { NextFunction, Request, Response } from "express";
import User from "../model/userModel";

import expressAsyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import ApiError from "../utils/ApiError";
import { jsonwebtoken } from "../interfaces/Jwt";
import { sendMail } from '../utils/sendMail';

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
    if(currentUser?.active === false){
        return next(new ApiError('this user was deleted' , 400))
    }
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


export const forgotPassword = expressAsyncHandler(async(req:Request, res:Response,next:NextFunction)=>{
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return next(new ApiError('this email does not exist' , 404))
    }
    const resetCode = Math.floor(1000 * Math.random() * 9000).toString()
    const hashCode = crypto.createHash('sha256').update(resetCode).digest('hex')

    user.resetPasswordCode = hashCode
    user.resetPasswordCodeExpire = Date.now() + 60 * 10 *1000
    user.resetPasswordVerified = false

    user.save()

    const message = `Hi ${user.name} , \n we received reqest to reset password on your Kerlos-Shop , \n ${resetCode} , \n enter this code to complete the reset.`

    await sendMail(
        {
            email : user.email, 
            subject:'Reset your passowrd available for 10 min',
            message
        }
    )
    res.status(200).json({status :"success" , message : 'reset code sent to email'})
})

export const verifyResetCode = expressAsyncHandler(async(req:Request, res:Response,next:NextFunction)=>{
    const hash = crypto.createHash('sha256').update(req.body.resetCode).digest('hex')

    const user =await User.findOne(
        {
            resetPasswordCode : hash,
            resetPasswordCodeExpire : {$gt : Date.now()}
        }
    )

    if(!user){
        return next(new ApiError('invalid code or expired' , 400))
    }
    user.resetPasswordVerified= true

    await user.save()
    
    res.status(200).json({message:"verified"})

})

export const resetPassword = expressAsyncHandler(async(req:Request, res:Response,next:NextFunction)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new ApiError('this email does not exist' , 404))
    }
    if(!user.resetPasswordVerified){
        return next(new ApiError('the code not verified' , 400))
    }
    user.password = req.body.newPassword

    user.resetPasswordCode = undefined
    user.resetPasswordCodeExpire = undefined
    user.resetPasswordVerified = undefined

    await user.save()

    res.status(200).json({status:'success' , message:'your password reseted'})
})

