import express , { Router } from "express";
import { CreateProduct, DeleteProduct, GetProduct, UpdateProduct, getProductById } from "../service/productService";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../validator/productValidator";


const router:Router = express.Router()

router.route('/')
.get(GetProduct)
.post(createProductValidator , CreateProduct)

router.route('/:id')
.get(getProductValidator , getProductById)
.put(updateProductValidator , UpdateProduct)
.delete(deleteProductValidator , DeleteProduct)

export default router