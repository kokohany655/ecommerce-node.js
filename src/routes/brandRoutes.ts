import  express, { Router } from "express";
import { createBrand, delelteBrand, getAllBrands, getBrandById, resizeImage, updateBrand, uploadBrandImage } from "../service/BrandService";
import { createBrandValidator, deleteBrandValidator, getBrandVadlidator, updateBrandValdiator } from "../validator/brandValidator";
import { allowTo, protect } from '../service/authServices'

const router:Router = express.Router()

router.route('/')
.get(getAllBrands)
.post(protect,allowTo('manager' , 'admin') , uploadBrandImage , resizeImage , createBrandValidator ,createBrand)

router.route("/:id")
.get( getBrandVadlidator ,getBrandById)
.put(protect,allowTo('manager' , 'admin') , uploadBrandImage , resizeImage , updateBrandValdiator ,updateBrand)
.delete(protect,allowTo( 'admin') , deleteBrandValidator ,delelteBrand)

export default router;