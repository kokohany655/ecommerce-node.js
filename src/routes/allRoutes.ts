import { Application } from 'express'

import categoryRoutes from './categoryRoutes'
import subcategoryRoutes from './subcategoryRoutes'
import brandRoutes from './brandRoutes'
import productRoutes from './productRoutes'
import userRoutes from './userRoutes'
import authRoutes from './authRoutes'
import reviewRoutes from './reviewRoutes'
import wishlistRoutes from './wishlistRoutes'
import addressRoutes from './addressRoutes'
import couponRoutes from './couponRoutes'
import cartRoutes from './cartRoutes'
import orderRoutes from './orderRoutes'

export const allRoutes = (app:Application)=>{
    app.use('/api/v1/categories' , categoryRoutes)
    app.use('/api/v1/subcategories' , subcategoryRoutes)
    app.use('/api/v1/brands' , brandRoutes)
    app.use('/api/v1/products' , productRoutes)
    app.use('/api/v1/users' , userRoutes)
    app.use('/api/v1/auth' , authRoutes)
    app.use('/api/v1/reviews' , reviewRoutes)
    app.use('/api/v1/wishlist' , wishlistRoutes)
    app.use('/api/v1/address' , addressRoutes)
    app.use('/api/v1/coupon' , couponRoutes)
    app.use('/api/v1/cart' , cartRoutes)
    app.use('/api/v1/order' , orderRoutes)
}

