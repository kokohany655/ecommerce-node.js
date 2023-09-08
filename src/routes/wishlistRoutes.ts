import express from 'express'
import { allowTo, protect } from '../service/authServices'
import { addProductToWishlist, getWishlist, removeProductFromWishlist } from '../service/wishlistServices'

const router = express.Router()

router.get('/' , protect, allowTo( 'user')  , getWishlist)
router.post( '/',protect ,allowTo( 'user') ,addProductToWishlist)
router.delete('/:productId',protect ,allowTo( 'user') ,removeProductFromWishlist )

export default router