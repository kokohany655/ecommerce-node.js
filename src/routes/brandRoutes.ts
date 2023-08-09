import  express, { Router } from "express";
import { createBrand, delelteBrand, getAllBrands, getBrandById, resizeImage, updateBrand, uploadBrandImage } from "../service/BrandService";
import { createBrandValidator, deleteBrandValidator, getBrandVadlidator, updateBrandValdiator } from "../validator/brandValidator";

const router:Router = express.Router()

router.route('/')
.get(getAllBrands)
.post( uploadBrandImage , resizeImage , createBrandValidator ,createBrand)

router.route("/:id")
.get( getBrandVadlidator ,getBrandById)
.put(uploadBrandImage , resizeImage , updateBrandValdiator ,updateBrand)
.delete( deleteBrandValidator ,delelteBrand)

export default router;