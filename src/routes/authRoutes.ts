import  {Router} from 'express'
import { login, signup } from '../service/authServices'
import { loginValidator, signupValidator } from '../validator/authValidator'

const router = Router()

router.route('/signup').post(signupValidator , signup)

router.route('/login').post(loginValidator,login)



export default router