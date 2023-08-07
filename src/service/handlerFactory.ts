import asyncHandler from 'express-async-handler'
import ApiError from "../utils/ApiError";
import { NextFunction, Request, Response } from 'express';
import slugify from "slugify";
import { ApiFeature } from '../utils/ApiFeature';
import { QueryOptions } from 'mongoose';

export const deleteOne= (Model:any)=>{
   return asyncHandler(async(req:Request , res:Response , next:NextFunction):Promise<void>=>{
        const documents = await Model.findByIdAndDelete(req.params.id)
        if(!documents){
            return next(new ApiError(`no ${Model} found with this id`, 404))
        }
         res.status(204).send('success')
    })
}

export const updateOne = (Model:any)=> {
    return asyncHandler(async(req:Request ,res:Response , next:NextFunction):Promise<void>=>{
        const document = await Model.findByIdAndUpdate({_id:req.params.id} , req.body , {new:true})
        if(!document){
            return next(new ApiError(`no ${Model} found with this id` , 404))
        }
        res.status(200).json({data:document})
    })
}


export const createOne = (Model:any)=>{
    return asyncHandler(async(req:Request , res:Response ):Promise<void>=>{
        const document = new Model(req.body)
        await document.save()
        res.status(201).json({data:document})
    })
}

export const getOne = (Model:any)=>{
    return  asyncHandler(async(req:Request , res:Response , next:NextFunction):Promise<void>=>{
        const document = await Model.findById(req.params.id)
        if(!document){
            next(new ApiError(`no ${Model} found with id` , 404));
            return;
        }
        res.status(200).json({data:document})
    })
}


export const getAll = (Model:any)=>{
    return asyncHandler(async(req:Request , res:Response ):Promise<void>=>{
        const countDocuments = await Model.countDocuments()

        let filter = {}
        if(req.body.filterObject){
            filter= req.body.filterObject
        }
        
        let apiFeature = new ApiFeature(Model.find(filter), req.query)
            .paginate(countDocuments)
            .filter()
            .search(`${Model}`)
            .selectFields()
            .sort()
    
        const {mongooseQuery , pagination} = apiFeature
        const document:QueryOptions = await mongooseQuery
    
        
        res.status(200).json({result : document.length, pagination , data : document})
    })
}