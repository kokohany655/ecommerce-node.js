import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Cart from "../model/CartModel";
import ApiError from "../utils/ApiError";
import Order from "../model/OrderModel";
import Product from "../model/ProductModel";
import { getAll, getOne } from "./handlerFactory";


export const createOrder = expressAsyncHandler(async(req:Request , res:Response ,next:NextFunction)=>{
    const tax = 0
    const shipping = 0
    const cart = await Cart.findById(req.params.cartId)
    if(!cart){
        return next(new ApiError('no found cart with this id ' , 404))
    }
    const totalPrice = cart.TotalPriceAfterDiscount ? cart.TotalPriceAfterDiscount : cart.totalPriceCart
    const totalOrderPrice = Number(totalPrice) + tax + shipping

    const order = new Order(
        {
            user:req?.user?._id,
            cartItems : cart.cartItem,
            shippiingAddress:req.body.shippiingAddress,
            totalOrderPrice,
        }
    )
    if(order){
    const bulkOption = cart.cartItem.map(item=>({
            updateOne:{
                filter:{_id : item.product},
                update:{$inc : {quantity : -item.quantity , sold : +item.quantity}}
            }
        
    }))

    await Product.bulkWrite(bulkOption , {})

    await Cart.findByIdAndUpdate(req.params.cartId)
    }
    await order.save()
    res.status(201).json({data:order})
})

export const filterOrderForLoggedUser = expressAsyncHandler(async(req:Request, res:Response , next :NextFunction)=>{
    if(req?.user?.role == "user"){
        req.body.filterObject = {user : req.user._id}
    }
    next()
})

export const getAllOrder = getAll(Order)

export const getSpecificOrder = getOne(Order)

export const updateOrderToPaid = expressAsyncHandler(async(req:Request, res:Response , next :NextFunction)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ApiError("not found" , 404 ))
    }
    order.isPaid = true
    order.paidAt = (Date.now() as any)

    const updateOrder = await order.save()

    res.status(201).json({updateOrder})
})

export const updateDeliverd = expressAsyncHandler(async(req:Request, res:Response , next :NextFunction)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ApiError("not found" , 404 ))
    }
    order.isDelivered = true
    order.deliveredAt = (Date.now() as any)

    const updateOrder = await order.save()

    res.status(201).json({updateOrder})
})