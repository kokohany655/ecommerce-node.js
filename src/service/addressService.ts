import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel";





export const addAddress = expressAsyncHandler(async(req:Request ,res:Response , next:NextFunction)=>{
    const user = await User.findByIdAndUpdate(req.user?._id , {
        $addToSet : {address : req.body}
    })

    res.status(201).json({data : user?.address})
})


export const removeAddress = expressAsyncHandler(async(req:Request ,res:Response , next:NextFunction)=>{
    const user = await User.findByIdAndUpdate(req.user?._id , {
        $pull : {address : {__id :req.params.addressId as any}}
    })

    res.status(201).json({data : user?.address})
})


export const getAddress = expressAsyncHandler(async(req:Request ,res:Response , next:NextFunction)=>{
    const user = await User.findById(req.user?._id).populate('address')

    res.status(200).json({result : user?.address.length  ,data: user?.address })
})