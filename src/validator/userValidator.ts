import { body, check } from 'express-validator'
import {validate} from './validate'
import slugify  from "slugify";
import User from '../model/userModel';
import bcrypt from 'bcrypt'


export const getUserVadlidator = [
    check('id')
    .isMongoId().withMessage('Invalid Id'),
    validate
]

export const createUserValidator = [
    check('name')
    .notEmpty().withMessage('name is required')
    .isLength({min : 2})
    .isLength({max : 20})
    .custom((val , {req})=>{
        req.body.slug = slugify(val)
        return true
    }),
    check("email")
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('enter valid email')
    .custom(val=>{
        return User.findOne({email:val}).then((user)=>{
            if(user){
                return Promise.reject(new Error('email is already found'))
            }
        })
    }),
    check("password")
    .notEmpty().withMessage('password is required')
    .isLength({min : 6}).withMessage('too short')
    .custom((password , {req})=>{
        if(password != req.body.passwordConfirm){
            throw new Error ('Passwords do not match');
        }
        return true
    })
    ,
    check("passwordConfirm").notEmpty().withMessage('passwordConfirm is required')
    ,
    check('phone').isMobilePhone(['ar-EG' , 'ar-SA']).withMessage('should Eg and SA phone number'),
    check("profileImg").optional(),
    check("role").optional()
    ,
    validate
]

export const updateUserValdiator = [
    check('name')
    .isLength({min : 2})
    .isLength({max : 20})
    .custom((val , {req})=>{
        req.body.slug = slugify(val)
        return true
    }),
    check("email")
    .isEmail().withMessage('enter valid email')
    .custom(val=>{
        return User.findOne({email:val}).then((user)=>{
            if(user){
                return Promise.reject(new Error('email is already found'))
            }
        })
    }),
    check('phone').optional().isMobilePhone(['ar-EG' , 'ar-SA']).withMessage('should Eg and SA phone number'),
    check("profileImg").optional(),
    check("role").optional()
    ,validate
    
]

export const changeUserPasswordValidator = [
    check("id").isMongoId().withMessage('invalid id'),
    body("currentPassword").notEmpty().withMessage('you must enter currentPassword'),
    body("passwordConfirm").notEmpty().withMessage('you must enter passwordConfirm'),
    body("password").notEmpty().withMessage('you must enter password')
    .custom(async(val,{req})=>{
        const user = await User.findById(req?.params?.id)
            if(!user){
                throw new Error('there is no user for this id')
            }
            if(user){
                console.log(user.password , req.body.currentPassword)

                const correctPassword =await bcrypt.compareSync(req.body.currentPassword , String(user.password))
                console.log(correctPassword)
                if(!correctPassword){
                    throw new Error('password confimation incorrect')
                }
            }

            if(val !== req.body.passwordConfirm){
                throw new Error('password and confirm password not match');
            }
        
            return true

    }),
    validate
]


export const deleteUserValidator = [
    check('id')
    .isMongoId().withMessage('invalid id')
    , validate
]
