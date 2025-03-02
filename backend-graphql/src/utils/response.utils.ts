import { Response } from "express"
import httpStatusCode from 'http-status-codes'


const sendApiResponse = <T>(res:Response,data : T,message : string,statusCode:number=httpStatusCode.ACCEPTED) : Response => {
    return res.status(statusCode).json({
        message,
        data,
        statusCode,
        error : false
    })
}

export {
    sendApiResponse
}