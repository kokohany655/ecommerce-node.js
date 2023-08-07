import express, { Router } from 'express'
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from '../service/categoryService'
import { createCategoryValidator, deleteCategoryValidate, getCategoryValidator, updateCategoryValidator } from '../validator/CategoryValidator'
import subcategoryRoute from './subcategoryRoutes'
import { createFilterObject } from '../service/subCategoryService'
const router:Router = express.Router()

router.use('/:categoryId/subcategories' , createFilterObject , subcategoryRoute)

router.route('/')
.get(getAllCategory)
.post(createCategoryValidator,createCategory)

router.route('/:id')
.get( getCategoryValidator ,getCategoryById)
.put(updateCategoryValidator,updateCategory) 
.delete(deleteCategoryValidate,deleteCategory)

export default router