import Category from '../model/CategoryModel'
import { createOne, deleteOne, getAll, getOne, updateOne } from './handlerFactory'


export const getAllCategory = getAll(Category)

export const getCategoryById = getOne(Category)

export const createCategory = createOne(Category)

export const updateCategory  = updateOne(Category)

export const deleteCategory = deleteOne(Category)