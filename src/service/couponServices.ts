import Coupon from "../model/couponModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory";



export const getAllCoupon = getAll(Coupon)

export const getCouponById = getOne(Coupon)

export const createCoupon = createOne(Coupon)

export const updateCoupon = updateOne(Coupon)

export const delelteCoupon = deleteOne(Coupon)