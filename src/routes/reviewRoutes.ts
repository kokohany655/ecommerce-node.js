import  express, { Router } from "express";
import { allowTo, protect } from '../service/authServices'
import { createReview, delelteReview, getAllReview, getReviewById, updateReview } from "../service/reviewServices";
import { createReviewValidator, deleteReviewValidator, updateReviewValidator } from "../validator/reviewValidator";

const router:Router = express.Router()

router.route('/')
.get(getAllReview)
.post(protect,allowTo('user'), createReviewValidator ,createReview)

router.route("/:id")
.get( getReviewById)
.put(protect,allowTo('user'), updateReviewValidator , updateReview)
.delete(protect,allowTo( 'admin' , 'user' , 'manager'), deleteReviewValidator , delelteReview)

export default router;