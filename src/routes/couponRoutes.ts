import  express, { Router } from "express";
import { allowTo, protect } from '../service/authServices'
import { createCoupon, delelteCoupon, getAllCoupon, getCouponById, updateCoupon } from "../service/couponServices";

const router:Router = express.Router()

router.use(protect,allowTo('manager' , 'admin') )
router.route('/').get(getAllCoupon).post(createCoupon)
router.route("/:id").get(getCouponById).put(updateCoupon).delete(delelteCoupon)

export default router;