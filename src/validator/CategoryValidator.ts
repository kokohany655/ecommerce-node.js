import { check } from 'express-validator'
import {validate} from './validate'

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
    .isLength({max : 20}).withMessage("too long"),
    validate
]

export const updateCategoryValidator = [
    check('id')
    .isMongoId()
    .withMessage("Invalid ID"),
    validate
]

export const deleteCategoryValidate = [
    check('id')
    .isMongoId()
    .withMessage("invalid id"),
    validate
]
