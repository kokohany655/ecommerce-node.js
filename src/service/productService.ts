import expressAsyncHandler from 'express-async-handler'
import { v4 as uuidv4 } from 'uuid'
import Product from '../model/ProductModel'
import { createOne, deleteOne, getAll, getOne, updateOne } from './handlerFactory'
import sharp from 'sharp'
import { NextFunction, Request, Response } from 'express'
import { uploadListImage } from '../middleware/uploadImageMiddleware'



export const uploadProductImage = uploadListImage(
    [
        {name : "imageCover" , maxCount:1},
        {name : "image" , maxCount:5}
    ]
)

export const resizeProductImage = expressAsyncHandler(async(req:Request , res:Response,next:NextFunction)=>{
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const imageCoverFilename =  `product-imageCover-${uuidv4()}-${Date.now()}.jpeg`
    if(files.imageCover){
        await sharp(files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({quality: 90})
        .toFile(`./src/upload/product/${imageCoverFilename}`)

        req.body.imageCover = imageCoverFilename
    }

    if(files.image){
        req.body.image = []
    await   Promise.all(
            files.image.map(async(img , index)=>{
                const productImageFilename =  `product-image-${index}-${uuidv4()}-${Date.now()}.jpeg`
                await sharp(img.buffer)
                .resize(2000, 1333)
                .toFormat("jpeg")
                .jpeg({quality: 90})
                .toFile(`./src/upload/product/${productImageFilename}`)
        
                req.body.image.push(productImageFilename)
            })
        )
    }
    next()
})
    
 
export const GetProduct = getAll(Product)


export const getProductById = getOne(Product)


export const CreateProduct = createOne(Product)


export const UpdateProduct = updateOne(Product)


export const DeleteProduct = deleteOne(Product)
