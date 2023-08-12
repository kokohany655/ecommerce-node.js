import Review from "../model/reviewModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory";




export const getAllReview = getAll(Review)

export const getReviewById = getOne(Review)

export const createReview = createOne(Review)

export const updateReview = updateOne(Review)

export const delelteReview = deleteOne(Review)