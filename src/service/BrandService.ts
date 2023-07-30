import { NextFunction, Request, Response } from "express";
import Brand from "../model/BrandModel";
import asyncHandler from 'express-async-handler'
import slugify  from "slugify";
import ApiError from "../utils/ApiError";

export const getAllBrands = asyncHandler(async(req:Request , res:Response ):Promise<void>=>{
    const page = (req.query.page as unknown) as number || 1
    const limit = (req.query.limit as unknown) as number || 5 
    const startIndex = (page - 1) * limit 
    const brand = await Brand.find().skip(startIndex).limit(limit)
    res.status(200).json({result : brand.length , data : brand})
})

export const getBrandById = asyncHandler(async(req:Request , res:Response , next:NextFunction):Promise<void>=>{
    const brand = await Brand.findById(req.params.id)
    if(!brand){
        next(new ApiError('no brand found with id' , 404))
    }
    res.status(200).json({data:brand})
})

export const createBrand = asyncHandler(async(req:Request , res:Response ):Promise<void>=>{
    const {name} = req.body
    const brand = new Brand({name , slug : slugify(name)})
    await brand.save()
    res.status(201).json({data:brand})
})

export const updateBrand = asyncHandler(async(req:Request, res:Response , next:NextFunction):Promise<void>=>{
    const {name} = req.body
    const brand = await Brand.findByIdAndUpdate({_id:req.params.id} , {name ,slug: slugify(name)} , {new:true})
})

export const delelteBrand = asyncHandler(async(req:Request , res:Response , next:NextFunction):Promise<void>=>{
    const brand = await Brand.findByIdAndDelete(req.params.id)
    if(!brand){
        next(new ApiError('no brand found with this id' , 404))
    }
    res.status(200).send('deleted successful')
})