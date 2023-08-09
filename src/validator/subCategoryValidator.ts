import { body, check  } from "express-validator";
import { validate } from "./validate";
import Category from "../model/CategoryModel";
import slugify from "slugify";


export const getSubcategory = [
    check('id')
    .isMongoId()
    .withMessage('invalid'),
    validate
]

export const createSubcategory = [
    check('name')
    .notEmpty().withMessage('name is required')
    .isLength({min: 2}).withMessage('too short')
    .isLength({max: 20}).withMessage('too long')
    .custom((val ,{req})=>{
        req.body.slug = slugify(val)
        return true
    })
    ,
    check('category').isMongoId().withMessage('is invalid id')
    .custom(cateogryId =>{
      return Category.findById(cateogryId).then(category=>{
        if(!category){
            return Promise.reject(new Error(`this subCategory is not exist ${category}`))
        }
      })
    })
    ,
    validate
]

export const updateSubcategory = [
    check('id').isMongoId().withMessage('invalid id'),
    check('name')
    .isLength({min : 2})
    .isLength({max : 20})
    .custom((val ,{req})=>{
        req.body.slug = slugify(val)
        return true
    })
    ,
    check('category').isMongoId().withMessage('invalid id')
    .custom(categoryId=>{
        return Category.find(categoryId).then(category=>{
            if(!category){
                return Promise.reject(new Error('this category does not exist'))
            }
        })
    })
    
    ,
    validate
]

export const deleteSubcategory = [
    check('id').isMongoId().withMessage('invalid id'),
    validate
]