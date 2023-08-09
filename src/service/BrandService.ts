import { uploadImage } from "../middleware/uploadImageMiddleware";
import Brand from "../model/BrandModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory";

import { v4 as uuidv4 } from 'uuid'
import sharp from 'sharp'
import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

export const uploadBrandImage = uploadImage("image")

export const resizeImage =expressAsyncHandler((req:Request ,res:Response ,next:NextFunction)=>{

    const filename =  `brand-${uuidv4()}-${Date.now()}.jpeg`
    sharp(req?.file?.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({quality : 90})
    .toFile(`./src/upload/brand/${filename}`)
    req.body.image = filename
    next()
})


export const getAllBrands = getAll(Brand)

export const getBrandById = getOne(Brand)

export const createBrand = createOne(Brand)

export const updateBrand = updateOne(Brand)

export const delelteBrand = deleteOne(Brand)