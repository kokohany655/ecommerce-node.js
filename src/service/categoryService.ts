import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Category from '../model/CategoryModel'
import ApiError from '../utils/ApiError'
import slugify from 'slugify'


export const getAllCategory = asyncHandler(async(req:Request,res:Response):Promise<void>=>{
    const page = (req.query.page as unknown)as number || 1
    const limit = (req.query.limit as unknown)as number || 5
    const startIndex = (page - 1) * limit
    const category:any=await Category.find().skip(startIndex).limit(limit);
    res.status(200).send({result: category.length , data:category})
})

export const getCategoryById = asyncHandler(async(req:Request , res:Response , next:NextFunction):Promise<void>=>{
    const category = await Category.findById(req.params.id)
    if(!category){
        return next(new ApiError('category not found' , 404))
    }
    res.status(200).send({date:category})
})

export const createCategory = asyncHandler(async(req:Request, res:Response):Promise<void>=>{
    const {name} = req.body
    const category = new Category({name ,slug:slugify(name)})
    await category.save()
    res.status(201).send({data:category})
})

export const updateCategory  = asyncHandler(async(req:Request, res:Response, next:NextFunction):Promise<void>=>{
    const {name} = req.body
    const category = await Category.findByIdAndUpdate({_id:req.params.id}, {name,slug: slugify(name)} , {new:true})

    if(!category){
        return next(new ApiError('category not found' , 404))
    }
    res.status(200).send({date:category})

})

export const deleteCategory = asyncHandler(async(req:Request,res:Response, next:NextFunction):Promise<void>=>{
    const category = await Category.findByIdAndDelete(req.params.id)
    if(!category){
        return next(new ApiError('category not found' , 404))
    }
    res.status(204).send('success')
})