import { check } from "express-validator";
import { validate } from "uuid";


export const addAddressValidator = [
    check('phone').isMobilePhone(['ar-EG' , 'ar-SA']).withMessage('should Eg and SA phone number'),
    validate
]