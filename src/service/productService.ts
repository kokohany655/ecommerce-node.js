import Product from '../model/ProductModel'
import { createOne, deleteOne, getAll, getOne, updateOne } from './handlerFactory'


export const GetProduct = getAll(Product)


export const getProductById = getOne(Product)


export const CreateProduct = createOne(Product)


export const UpdateProduct = updateOne(Product)


export const DeleteProduct = deleteOne(Product)
