import { body, check } from 'express-validator'
import {validate} from './validate'
import Category from '../model/CategoryModel'
import SubCategory from '../model/SubCategoryModel'
import slugify from 'slugify'

export const getProductValidator = [
    check('id').isMongoId().withMessage('invalid id')
    ,
    validate
]

export const createProductValidator = [
    check('title')
        .notEmpty()
        .withMessage('product title required')
        .isLength({min:3})
        .withMessage('must be at least 3 char')
        .custom((val , {req})=>{
            req.body.slug = slugify(val)
            return true
        })
        ,
    check('description')
        .notEmpty()
        .withMessage('product description required')
        .isLength({max:200})
        .withMessage('Too long description'),
    check('quantity')
        .notEmpty()
        .withMessage('product quantity required')
        .isNumeric()
        .withMessage('product quantity must be a number'),
    check('sold')
        .optional()
        .isNumeric()
        .withMessage('product sold must be a number'),
    check('price')
        .notEmpty()
        .withMessage('product price required')
        .isNumeric()
        .withMessage('product price must be a number')
        .isLength({max:20})
        .withMessage('Too long price'),
    check('priceAfterDicount')
        .optional()
        .toFloat()
        .isNumeric()
        .withMessage('product quantity must be a number')
        .custom((priceAfterDic , {req})=>{
            if(priceAfterDic >= req.body.price){
                throw new Error('price after discount must be lower than price')
            }
            return true
        }),
    check('colors')
        .optional()
        .isArray()
        .isNumeric()
        .withMessage('product quantity must be a number'),
    check('imageCover')
        .notEmpty()
        .withMessage('product image cover required'),
    check('category')
        .notEmpty()
        .withMessage('product must be belong to category')
        .isMongoId()
        .withMessage('invalid id')
        .custom(categoryId=>{
            return Category.findById(categoryId).then(category=>{
                if(!category){
                    return Promise.reject(new Error('no category with this id'))
                }
            })
        }),
    check('subCategory')
        .optional()
        .isMongoId()
        .withMessage('invalid id')
        .custom(subcategoryIds =>{
            return SubCategory.find({_id :{$exist: true , $in: subcategoryIds}}).then(subcategories=>{
                if(subcategories.length < 1 || subcategories.length !== subcategoryIds.length){
                    return Promise.reject(
                        new Error(`subcategory not exist with ids`)
                    )
                }
            })
        })
        .custom((subcategoryIds , {req})=>{
            return SubCategory.find({category :  req.body.category}).then(subcategory=>{
                const subcategoryId:string[]=[]
                subcategory.forEach(e=>{
                    subcategoryId.push(String(e._id))
                })
                if(!subcategoryIds.every((e:string)=> subcategoryId.includes(e))){
                    return Promise.reject(new Error('subcategory not belong to thi category'))
                }
            })
        }),
        validate
]

export const updateProductValidator = [
    check('id').isMongoId().withMessage('invalid id'),
    check('title')
        .isLength({min:3})
        .withMessage('must be at least 3 char')
        .custom((val , {req})=>{
            req.body.slug = slugify(val)
            return true
        })
        ,
    check('description')
        .isLength({max:200})
        .withMessage('Too long description'),
    check('quantity')
        .isNumeric()
        .withMessage('product quantity must be a number'),
    check('sold')
        .optional()
        .isNumeric()
        .withMessage('product sold must be a number'),
    check('price')
        .isNumeric()
        .withMessage('product price must be a number')
        .isLength({max:20})
        .withMessage('Too long price'),
    check('priceAfterDicount')
        .optional()
        .toFloat()
        .isNumeric()
        .withMessage('product quantity must be a number')
        .custom((priceAfterDic , {req})=>{
            if(priceAfterDic >= req.body.price){
                throw new Error('price after discount must be lower than price')
            }
            return true
        }),
    check('colors')
        .optional()
        .isArray()
        .isNumeric()
        .withMessage('product quantity must be a number'),
    check('category')
        .isMongoId()
        .withMessage('invalid id')
        .custom(categoryId=>{
            return Category.findById(categoryId).then(category=>{
                if(!category){
                    return Promise.reject(new Error('no category with this id'))
                }
            })
        }),
    check('subCategory')
        .optional()
        .isMongoId()
        .withMessage('invalid id')
        .custom(subcategoryIds =>{
            return SubCategory.find({_id :{$exist: true , $in: subcategoryIds}}).then(subcategories=>{
                if(subcategories.length < 1 || subcategories.length !== subcategoryIds.length){
                    return Promise.reject(
                        new Error(`subcategory not exist with ids`)
                    )
                }
            })
        })
        .custom((subcategoryIds , {req})=>{
            return SubCategory.find({category :  req.body.category}).then(subcategory=>{
                const subcategoryId:string[]=[]
                subcategory.forEach(e=>{
                    subcategoryId.push(String(e._id))
                })
                if(!subcategoryIds.every((e:string)=> subcategoryId.includes(e))){
                    return Promise.reject(new Error('subcategory not belong to thi category'))
                }
            })
        })
        ,
        validate
]

export const deleteProductValidator = [
    check('id').isMongoId().withMessage('invalid id'),
    validate
]
