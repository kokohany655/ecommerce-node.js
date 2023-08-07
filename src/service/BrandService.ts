import Brand from "../model/BrandModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory";

export const getAllBrands = getAll(Brand)

export const getBrandById = getOne(Brand)

export const createBrand = createOne(Brand)

export const updateBrand = updateOne(Brand)

export const delelteBrand = deleteOne(Brand)