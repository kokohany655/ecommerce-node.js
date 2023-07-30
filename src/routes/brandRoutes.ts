import  express, { Router } from "express";
import { createBrand, delelteBrand, getAllBrands, getBrandById, updateBrand } from "../service/BrandService";
import { createBrandValidator, deleteBrandValidator, getBrandVadlidator, updateBrandValdiator } from "../validator/brandValidator";

const router:Router = express.Router()

router.route('/')
.get(getAllBrands)
.post( createBrandValidator ,createBrand)

router.route("/:id")
.get( getBrandVadlidator ,getBrandById)
.put( updateBrandValdiator ,updateBrand)
.delete( deleteBrandValidator ,delelteBrand)

export default router;