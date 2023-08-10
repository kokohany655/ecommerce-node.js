import express, { Router } from "express";
import {createSubCategory, createSubCategoryByCategoryId,  deletesubCategory,  getAllSubCategory, getSubCateogryById, updateSubCategory } from "../service/subCategoryService";
import { createSubcategory, deleteSubcategory, getSubcategory, updateSubcategory } from "../validator/subCategoryValidator";
import { allowTo, protect } from "../service/authServices";

const router:Router = express.Router({mergeParams:true})

router.route('/')
.get(getAllSubCategory)
.post(protect,allowTo('manager' , 'admin') ,createSubCategoryByCategoryId , createSubcategory ,createSubCategory)

router.route('/:id')
.get(getSubcategory , getSubCateogryById)
.put(protect,allowTo('manager' , 'admin') ,updateSubcategory , updateSubCategory)
.delete(protect,allowTo( 'admin') , deleteSubcategory , deletesubCategory)

export default router