import express from 'express'
import { allowTo, protect } from '../service/authServices'
import { addAddress, getAddress, removeAddress } from '../service/addressService'
import { addAddressValidator } from '../validator/addressValidator'

const router = express.Router()

router.get('/' , protect, allowTo( 'user')  , getAddress)
router.post( '/',protect ,allowTo( 'user'), addAddressValidator ,addAddress)
router.delete('/:addressId',protect ,allowTo( 'user') ,removeAddress )

export default router