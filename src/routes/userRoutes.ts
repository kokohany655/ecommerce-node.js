import  express, { Router } from "express";
import { changePassword, createUser, delelteUser, getAllUser, getUserById, resizeImage, updateUser, uploadUserImage } from "../service/userServices";
import { changeUserPasswordValidator, createUserValidator, deleteUserValidator, getUserVadlidator, updateUserValdiator } from "../validator/userValidator";
import { allowTo, protect } from "../service/authServices";


const router:Router = express.Router()

router.route('/changePassword/:id')
.put(changeUserPasswordValidator,changePassword)

router.route('/')
.get(protect,allowTo('admin') ,getAllUser)
.post(protect,allowTo( 'admin') , uploadUserImage , resizeImage , createUserValidator ,createUser)

router.route("/:id")
.get(protect,allowTo('admin') , getUserVadlidator ,getUserById)
.put(protect,allowTo( 'admin') ,uploadUserImage , resizeImage , updateUserValdiator ,updateUser)
.delete(protect,allowTo( 'admin') , deleteUserValidator ,delelteUser)

export default router;