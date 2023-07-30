import express, { Router } from "express";
import { createSubCategory, createSubCategoryByCategoryId, deletesubCategory, getAllSubCategory, getSubCateogryById, updateSubCategory } from "../service/subCategoryService";
import { createSubcategory, deleteSubcategory, getSubcategory, updateSubcategory } from "../validator/subCategoryValidator";

const router:Router = express.Router({mergeParams:true})

router.route('/')
.get(getAllSubCategory)
.post(createSubCategoryByCategoryId , createSubcategory ,createSubCategory)

router.route('/:id')
.get(getSubcategory , getSubCateogryById)
.put(updateSubcategory , updateSubCategory)
.delete( deleteSubcategory ,deletesubCategory)

export default router