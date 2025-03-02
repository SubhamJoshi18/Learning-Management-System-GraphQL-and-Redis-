import { Request, Response, NextFunction } from 'express'
import statusCode from 'http-status-codes'


const notFoundError = (req : Request,res : Response, next: NextFunction) => {

     return res.status(statusCode.NOT_FOUND).json(
        {
            message : `The Requested Url : ${req.originalUrl} Does not Exists on the System`
        }
     )

}


const globalErrorHandler = (err : Error ,req : Request,res : Response, next: NextFunction) => {

    return res.status(statusCode.NOT_FOUND).json(
        {
            error : true,
            message : err.message,
            name : err.name,
            stack : err.stack
        }
     )

}



export {
    notFoundError,
    globalErrorHandler
}