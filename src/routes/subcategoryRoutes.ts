import express, { Router } from "express";
import { createSubCategory, deletesubCategory, getAllSubCategory, getSubCateogryById, updateSubCategory } from "../service/subCategoryRoutes";

const router:Router = express.Router()

router.route('/')
.get(getAllSubCategory)
.post(createSubCategory)

router.route('/:id')
.get(getSubCateogryById)
.put(updateSubCategory)
.delete(deletesubCategory)

export default router