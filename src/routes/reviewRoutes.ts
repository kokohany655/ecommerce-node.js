import  express, { Router } from "express";
import { allowTo, protect } from '../service/authServices'
import { createFilterObjectforProduct, createReview, delelteReview, getAllReview, getReviewById, setProductIdToBody, updateReview } from "../service/reviewServices";
import { createReviewValidator, deleteReviewValidator, updateReviewValidator } from "../validator/reviewValidator";

const router:Router = express.Router({mergeParams:true})

router.route('/')
.get(createFilterObjectforProduct,getAllReview)
.post(protect,allowTo('user'), setProductIdToBody,createReviewValidator ,createReview)

router.route("/:id")
.get( getReviewById)
.put(protect,allowTo('user'), updateReviewValidator , updateReview)
.delete(protect,allowTo( 'admin' , 'user' , 'manager'), deleteReviewValidator , delelteReview)

export default router;