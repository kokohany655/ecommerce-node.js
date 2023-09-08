import { check } from "express-validator";
import Review from "../model/reviewModel";
import { validate } from "./validate";


export const createReviewValidator = [
    check("title").optional(),
    check('ratings').notEmpty().withMessage('rating is required')
    .isFloat({min: 1 , max: 5}).withMessage('rating value must between 1 to 5'),
    check('user').isMongoId().withMessage('invalid id'),
    check("product").isMongoId().withMessage('invalid id')
    .custom((val , {req})=>{
        return Review.findOne({user : req.user._id , product: req.body.product}).then(review=>{
            if ( review ) throw new Error ('You have already reviewed this product');
        })
    }),validate
]

export const updateReviewValidator = [
    check("id").isMongoId().withMessage('invalid id')
    .custom((val , {req})=>{
        return Review.findById(req?.params?.id).then(review=>{
            if(!review){
                throw new Error('no review with this id')
            }
            if(review?.user?._id.toString() != req.user._id.toString()){
                throw new Error('you can not update this ne it is not your commit')
            }
        })
    })
    ,validate
]


export const deleteReviewValidator = [
    check("id").isMongoId().withMessage('invalid id')
    .custom((val , {req})=>{
        if(req.user.role == 'user'){
            return Review.findById(req?.params?.id).then(review=>{
                if(!review){
                    throw new Error('no review with this id')
                }
                if(review?.user?._id.toString() != req.user._id.toString()){
                    throw new Error('you can not update this ne it is not your commit')
                }
            })
        }
        
    })
    ,validate
]