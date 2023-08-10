import express , { Router } from "express";
import { CreateProduct, DeleteProduct, GetProduct, UpdateProduct, getProductById, resizeProductImage, uploadProductImage } from "../service/productService";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../validator/productValidator";
import { allowTo, protect } from "../service/authServices";


const router:Router = express.Router()

router.route('/')
.get(GetProduct)
.post(protect,allowTo('manager' , 'admin') , uploadProductImage,resizeProductImage ,createProductValidator , CreateProduct)

router.route('/:id')
.get(getProductValidator , getProductById)
.put(protect,allowTo('manager' , 'admin') ,updateProductValidator , UpdateProduct)
.delete(protect,allowTo( 'admin') ,deleteProductValidator , DeleteProduct)

export default router