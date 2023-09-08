import { NextFunction, Request, Response } from "express";
import SubCategory from "../model/SubCategoryModel";
import asyncHandler from 'express-async-handler'
import ApiError from "../utils/ApiError";
import slugify from "slugify";
import { ApiFeature } from "../utils/ApiFeature";
import { QueryOptions } from "mongoose";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory";

export const createSubCategoryByCategoryId = (req:Request , res:Response , next:NextFunction):void=>{
    //create a subcategory by its parent categoyId
    if(!req.body.category) req.body.category = req.params.categoryId
    next()
}

export const createFilterObject = (req:Request ,res:Response, next:NextFunction)=>{
    let filterObject:{category?:String} = {category:""}
    if(req.params.categoryId) filterObject = {category : req.params.categoryId}
    req.body.filterObject  = filterObject
    return next()
} 

export const getAllSubCategory = getAll(SubCategory)

export const getSubCateogryById = getOne(SubCategory)

export const createSubCategory = createOne(SubCategory)

export const updateSubCategory = updateOne(SubCategory)

export const deletesubCategory = deleteOne(SubCategory)