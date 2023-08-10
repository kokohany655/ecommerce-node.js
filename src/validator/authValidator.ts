import { check } from "express-validator"
import slugify from "slugify"
import User from "../model/userModel"
import { validate } from "./validate"



export const signupValidator = [
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
            console.log(user)
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
    validate
]



export const loginValidator = [
    check("email").notEmpty().withMessage('email is required')
    .custom((val)=>{
        return User.findOne({email : val}).then(user=>{
            if(!user){
                throw new Error('email does not exist')
            }
        })
    }),
    check("password").notEmpty().withMessage('password is required')
    ,validate
]