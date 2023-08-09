import { body, check } from 'express-validator'
import {validate} from './validate'
import slugify from 'slugify'

export const getCategoryValidator  = [
    check('id')
    .isMongoId()
    .withMessage("Invalid ID"),
    validate
]

export const createCategoryValidator = [
    check('name')
    .notEmpty().withMessage("Name is required")
    .isLength({min : 3}).withMessage("too short")
    .isLength({max : 20}).withMessage("too long")
    .custom((val , {req})=>{
        req.body.slug = slugify(val)
        return true
    })
    ,
    validate
]

export const updateCategoryValidator = [
    check('id')
    .isMongoId()
    .withMessage("Invalid ID"),
    check('name')
    .isLength({min : 3}).withMessage("too short")
    .isLength({max : 20}).withMessage("too long")
    .custom((val , {req})=>{
        req.body.slug = slugify(val)
        return true
    })
    ,
    validate
]

export const deleteCategoryValidate = [
    check('id')
    .isMongoId()
    .withMessage("invalid id"),
    validate
]
