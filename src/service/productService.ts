import slugify from 'slugify'
import {Request , Response, NextFunction} from 'express'
import ApiError from '../utils/ApiError'
import Product from '../model/ProductModel'
import asyncHandler from 'express-async-handler'
import { ApiFeature } from '../utils/ApiFeature'
import { QueryOptions } from 'mongoose'


export const GetProduct = asyncHandler(async(req:Request,res:Response):Promise<void>=>{
    const countDocuments = await Product.countDocuments()
    
    let apiFeature = new ApiFeature(Product.find(), req.query)
        .selectFields()
        .filter()
        .paginate(countDocuments)
        .search("Products")
        .sort()

    const {mongooseQuery , pagination} = apiFeature
    const product:QueryOptions = await mongooseQuery
    res.status(200).json({result: product.length, pagination , data:product})
})


export const getProductById = asyncHandler(async(req:Request, res:Response, next:NextFunction):Promise<void>=>{
    const {id} = req.params
    const product = await Product.findById(id).populate({path:'category' , select:'name -_id'})
    if(!product){
        return next(`Can not find this product with id:${req.params.id}`)
    }
    res.status(200).json({data:product})
})


export const CreateProduct = asyncHandler(async(req:Request, res:Response, next: NextFunction):Promise<void>=>{
    req.body.slug= slugify(req.body.title)
    const product = await new Product(req.body)
    await product.save()
    res.status(201).json({data:product})
})


export const UpdateProduct = asyncHandler(async(req:Request,res:Response, next:NextFunction):Promise<void>=>{
    const {id}= req.params
    if(req.body.title){
        req.body.slug = slugify(req.body.title)
    }
    const product = await Product.findByIdAndUpdate({_id:id},req.body,{new:true})
    if(!product){
        return next(new ApiError(`Cant not find this product0 with id:${req.params.id}`,404))
    }
    res.status(200).json({data:product})
})


export const DeleteProduct = asyncHandler(async(req:Request, res:Response,next:NextFunction):Promise<void>=>{
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product){
        return next(new ApiError(`Cant not find product with this id:${req.params.id}`, 404))
    }
    res.status(204).send(product)
})
