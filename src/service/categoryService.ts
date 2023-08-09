import { uploadImage } from '../middleware/uploadImageMiddleware'
import Category from '../model/CategoryModel'
import { createOne, deleteOne, getAll, getOne, updateOne } from './handlerFactory'

import { v4 as uuidv4 } from 'uuid'
import sharp from 'sharp'
import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'


export const uploadCategoryImage = uploadImage("image")

export const resizeImage =expressAsyncHandler((req:Request ,res:Response ,next:NextFunction)=>{

    const filename =  `category-${uuidv4()}-${Date.now()}.jpeg`
    sharp(req?.file?.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({quality : 90})
    .toFile(`./src/upload/category/${filename}`)
    req.body.image = filename
    next()
})


export const getAllCategory = getAll(Category)

export const getCategoryById = getOne(Category)

export const createCategory = createOne(Category)

export const updateCategory  = updateOne(Category)

export const deleteCategory = deleteOne(Category)