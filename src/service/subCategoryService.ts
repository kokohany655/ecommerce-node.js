import { NextFunction, Request, Response } from "express";
import SubCategory from "../model/SubCategoryModel";
import asyncHandler from 'express-async-handler'
import ApiError from "../utils/ApiError";
import slugify from "slugify";

export const createSubCategoryByCategoryId = (req:Request , res:Response , next:NextFunction):void=>{
    //create a subcategory by its parent categoyId
    if(!req.body.category) req.body.category = req.params.categoryId
    next()
}

export const getAllSubCategory = asyncHandler(async(req:Request , res:Response):Promise<void>=>{
    const page = (req.query.page as unknown) as number || 1
    const limit = (req.query.limit as unknown) as number || 5
    const startIndex = (page - 1 ) * limit

    let filterObject:{category?:String} = {category:""}
    if(req.params.categoryId) filterObject = {category : req.params.categoryId}

    const subcategory = await SubCategory.find(filterObject).skip(startIndex).limit(limit).populate({path: "category" , select :'name '})
    res.status(200).json({result:subcategory.length , data: subcategory})
})

export const getSubCateogryById = asyncHandler(async(req:Request , res:Response , next:NextFunction):Promise<void>=>{
    const subCategory = await SubCategory.findById(req.params.id)
    if(!subCategory){
        return next(new ApiError('No subCategory found with that id' , 404))
    }
    res.status(200).json({data:subCategory})
})

export const createSubCategory = asyncHandler(async(req:Request , res:Response , next:NextFunction):Promise<void>=>{
    const {category , name} = req.body
    const subCategory = new SubCategory({name , category ,slug: slugify(name)})
    await subCategory.save()
    res.status(201).json({data:subCategory})
})

export const updateSubCategory = asyncHandler(async(req:Request ,res:Response , next:NextFunction):Promise<void>=>{
    const {category , name} = req.body
    const subCategory = await SubCategory.findByIdAndUpdate({_id:req.params.id} , {name,category, slug: slugify(name)} , {new:true})
    if(!subCategory){
        return next(new ApiError('No subCategory found with that id' , 404))
    }
    res.status(200).json({data:subCategory})
})

export const deletesubCategory = asyncHandler(async(req:Request , res:Response , next:NextFunction):Promise<void>=>{
    const subcategory = await SubCategory.findByIdAndDelete(req.params.id)
    if(!subcategory){
        return next(new ApiError('no subCateogry found with this id', 404))
    }
    res.status(204).send('success')
})