import { NextFunction, Request, Response } from "express";
import Review from "../model/reviewModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory";

export const createFilterObjectforProduct= (req:Request, res:Response , next:NextFunction)=>{
    let filterObject:{product:string} = {product:''}
    if (req.params.productId){
        filterObject = {product : req.params.productId}
        req.body.filterObject = filterObject
        return next()
    }
}

export const setProductIdToBody = (req:Request, res:Response , next:NextFunction)=>{
    if(!req.body.product) req.body.product = req.params.productId
    if(!req.body.user) req.body.user = req?.user?._id
    next()
}


export const getAllReview = getAll(Review)

export const getReviewById = getOne(Review)

export const createReview = createOne(Review)

export const updateReview = updateOne(Review)

export const delelteReview = deleteOne(Review)