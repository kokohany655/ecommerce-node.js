import express from 'express'
import { addProductToCart, clearCart, deleteProdcutFromCart, getLoggeUserCart, updateCartItemQuantity } from '../service/cartServices'
import { allowTo, protect } from '../service/authServices'

const router = express.Router()

router.use(protect, allowTo( 'user') )

router.route('/')
.post(addProductToCart)
.get(getLoggeUserCart)
.delete(clearCart)

router.route('/:itemId').delete(deleteProdcutFromCart).put(updateCartItemQuantity)

export default router