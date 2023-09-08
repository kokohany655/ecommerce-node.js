import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Cart from "../model/CartModel";
import Product from "../model/ProductModel";
import ApiError from "../utils/ApiError";
import Coupon from "../model/couponModel";

const totalPrice = (cart:any)=>{
    let totalPrice= 0 
    cart.cartItem.forEach((item:any )=>{
        if(item){
            totalPrice = Number(item?.quantity) * Number(item?.price)
        }
    })
    cart.totalPriceCart = totalPrice
    cart.TotalPriceAfterDiscount = undefined
}


export const addProductToCart = expressAsyncHandler(async(req:Request ,res:Response, next:NextFunction)=>{
    const {productId , color} = req.body
    let cart = await Cart.findOne({user:req.user?._id})
    const product = await Product.findById(productId)

    if(!cart){
     cart =await new Cart(
            {
                cartItem:[{product:productId ,color , price:product?.price}],
                user:req.user?._id
            }
        )
    
    }else{
        const productIndex = cart?.cartItem.findIndex(
            (item:any) => item.product == productId && item.color == color
        )
        if(productIndex > -1){
            const cartItem = cart.cartItem[productIndex]
           if(cartItem.quantity ) cartItem.quantity +=1
           cart.cartItem[productIndex] = cartItem
           console.log(cartItem)
        }else{
            cart.cartItem.push({product: productId, color, price: product?.price,quantity: req.body.quantity})
        }
    }

    totalPrice(cart)
    await cart.save()

    res.status(200).json({status:"success" , message: "product added to cart" , data:cart})
})


export const getLoggeUserCart = expressAsyncHandler(async(req:Request ,res:Response, next:NextFunction)=>{
    const cart = await Cart.findOne({user:req?.user?._id})
    if(!cart){
    return  next( new ApiError('there is not cart for this user' , 404))
    }

    res.status(200).json({numberOfCartItem : cart?.cartItem.length,data :cart})
})


export const deleteProdcutFromCart = expressAsyncHandler(async(req:Request ,res:Response, next:NextFunction)=>{
    const cart = await Cart.findByIdAndUpdate({user:req?.user?._id} , 
        {
            $pull : {cartItem : {_id:req.params.itemId}}
        },
        {new:true}
    )
    totalPrice(cart)
    await cart?.save()
    res.status(200).json({numberOfCartItem : cart?.cartItem.length,data :cart})
})


export const clearCart = expressAsyncHandler(async(req:Request ,res:Response, next:NextFunction)=>{
    const cart = await Cart.findOneAndDelete({user:req?.user?._id})
    res.status(204).json()
})

export const updateCartItemQuantity = expressAsyncHandler(async(req:Request ,res:Response, next:NextFunction)=>{
    const {quantity} = req.body
    let cart = await Cart.findOne({user:req?.user?._id})
    if(!cart){
        return next(new ApiError('no cart for this id' , 404))
    }

    const itemIndex = cart.cartItem.findIndex((item:any)=>{
        item._id === req.params.itemId
    })

    if(itemIndex > -1){
        cart.cartItem[itemIndex].quantity = quantity 
    }else{
        return next(new ApiError('this product does not exist in cart' , 404))
    }
    totalPrice(cart)
    await cart.save()
    res.status(200).json({data:cart})
})

export const applyCoupon = expressAsyncHandler(async(req:Request ,res:Response, next:NextFunction)=>{
    const coupon = await Coupon.findOne({name: req.body.coupon , expire: {$gt : Date.now()}})
    if(!coupon){
        return next(new ApiError('Coupon is invalid or expired' , 400))
    }

    let cart = await Cart.findOne({user:req?.user?._id})

    if(cart?.TotalPriceAfterDiscount && cart?.totalPriceCart){
        cart.TotalPriceAfterDiscount = Number((cart?.totalPriceCart - (cart.totalPriceCart * Number(coupon.discount)) / 100).toFixed(2))
    }
    await cart?.save()

    res.status(200).json({numberOfItems : cart?.cartItem.length ,data:cart})

})