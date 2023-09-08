import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel";

export const addProductToWishlist = expressAsyncHandler(async(req:Request ,res:Response , next:NextFunction)=>{
    const user = await User.findByIdAndUpdate(req?.user?._id , {
        $addToSet :{wishList : req.body.productId}
    },{new : true}
    )

    res.status(200).json({message : "the product added to your washlist" , data:user?.wishList})
})


export const removeProductFromWishlist = expressAsyncHandler(async(req:Request ,res:Response , next:NextFunction)=>{
    const user = await User.findByIdAndUpdate(req?.user?._id , {
        $pull : {wishList : req.params.productId as any}
    },{new: true}
    )
    res.status(200).json({message : "the product removd from your washlist" , data:user?.wishList})

    
})


export const getWishlist = expressAsyncHandler(async(req:Request ,res:Response , next:NextFunction)=>{
    const user = await User.findById(req.user?._id).populate('wishList')

    res.status(200).json({result : user?.wishList.length  ,data: user?.wishList })
})