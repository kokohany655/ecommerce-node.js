import  express, { Router } from "express";
import { changePassword, createUser, delelteUser, deleteLoggedUserData, getAllUser, getLoggedUserData, getUserById, resizeImage, updateLoggedUserData, updatePasswordLoggedUser, updateUser, uploadUserImage } from "../service/userServices";
import { changeUserPasswordValidator, createUserValidator, deleteUserValidator, getUserVadlidator,  updateLoggedUserDataValidator,  updateUserValdiator } from "../validator/userValidator";
import { allowTo, protect } from "../service/authServices";


const router:Router = express.Router()

router.put('/changePassword/:id' ,changeUserPasswordValidator,changePassword)

router.get('/getme' ,protect , getLoggedUserData , getUserById)

router.put('/changeMyPassword' , protect , changeUserPasswordValidator , updatePasswordLoggedUser)

router.put('/updateme' , protect , updateLoggedUserDataValidator ,updateLoggedUserData)

router.delete('/deleteme' , protect , deleteLoggedUserData)



router.route('/')
.get(protect,allowTo('admin') ,getAllUser)
.post(protect,allowTo( 'admin') , uploadUserImage , resizeImage , createUserValidator ,createUser)

router.route("/:id")
.get(protect,allowTo('admin') , getUserVadlidator ,getUserById)
.put(protect,allowTo( 'admin') ,uploadUserImage , resizeImage , updateUserValdiator ,updateUser)
.delete(protect,allowTo( 'admin') , deleteUserValidator ,delelteUser)

export default router;