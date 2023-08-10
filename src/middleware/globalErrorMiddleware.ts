import { NextFunction, Request, Response } from "express"
import { Error } from "../interfaces/Error"



const globalError  = (err:Error,req:Request,res:Response,next:NextFunction):void=>{
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    console.log(err.name)
    res.status(err.statusCode).send(
        {
            message: err.name === 'JsonWebTokenError'? "invalid token": err.name === 'TokenExpiredError'? 'token expired , please log in again' : err.message ,
            error:  process.env.NODE_ENV === "development" ? err : undefined,
            status: err.status,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        }
    )
}

export default globalError