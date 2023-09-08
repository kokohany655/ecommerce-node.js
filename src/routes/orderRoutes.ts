import { Router } from "express";
import { allowTo, protect } from "../service/authServices";
import { createOrder, filterOrderForLoggedUser, getAllOrder, getSpecificOrder, updateDeliverd, updateOrderToPaid } from "../service/orderServices";

const router = Router()

router.use(protect , allowTo('user'))

router.route('/:cartId')
.post(createOrder)

router.route('/')
.get(allowTo('user' , 'manager' , 'admin') , filterOrderForLoggedUser , getAllOrder)


router.get('/:id' , getSpecificOrder)

router.put('/:id/pay' ,allowTo('manager' , 'admin') , updateOrderToPaid )
router.put('/:id/deliver' ,allowTo('manager' , 'admin') , updateDeliverd )

export default router