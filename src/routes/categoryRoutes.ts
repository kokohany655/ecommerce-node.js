import express, { Router } from 'express'
import {  createCategory, deleteCategory, getAllCategory, getCategoryById, resizeImage, updateCategory, uploadCategoryImage} from '../service/categoryService'
import { createCategoryValidator, deleteCategoryValidate, getCategoryValidator, updateCategoryValidator } from '../validator/CategoryValidator'
import subcategoryRoute from './subcategoryRoutes'
import { createFilterObject } from '../service/subCategoryService'
import { allowTo, protect } from '../service/authServices'



const router:Router = express.Router()



router.use('/:categoryId/subcategories' , createFilterObject , subcategoryRoute)

router.route('/')
.get(getAllCategory)
.post( protect,allowTo('manager' , 'admin') ,uploadCategoryImage, resizeImage ,createCategoryValidator,createCategory)

router.route('/:id')
.get( getCategoryValidator ,getCategoryById)
.put(protect,allowTo('manager' , 'admin') ,uploadCategoryImage, resizeImage , updateCategoryValidator,updateCategory) 
.delete(protect,allowTo('admin') , deleteCategoryValidate,deleteCategory)

export default router