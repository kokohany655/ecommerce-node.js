import { check } from 'express-validator'
import {validate} from './validate'
import slugify  from "slugify";

export const getBrandVadlidator = [
    check('id')
    .isMongoId().withMessage('Invalid Id'),
    validate
]

export const createBrandValidator = [
    check('name')
    .notEmpty().withMessage('name is required')
    .isLength({min : 2})
    .isLength({max : 20})
    .custom((val , {req})=>{
        req.body.slug = slugify(val)
        return true
    })
    ,
    validate
]

export const updateBrandValdiator = [
    check('id')
    .isMongoId().withMessage('invalid id'),
    check('name')
    .isLength({min : 2})
    .isLength({max : 20})
    .custom((val , {req})=>{
        req.body.slug = slugify(val)
        return true
    })
    ,validate
    
]


export const deleteBrandValidator = [
    check('id')
    .isMongoId().withMessage('invalid id')
    , validate
]
