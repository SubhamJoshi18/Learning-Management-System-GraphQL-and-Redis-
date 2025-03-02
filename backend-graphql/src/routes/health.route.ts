import { Router } from "express";
import { Request,Response } from "express";
import statusCode from 'http-status-codes'

const healthRouter = Router()

healthRouter.get('/health', (req:Request,res:Response) :  void  => {
    res.status(statusCode.ACCEPTED).json({
        message : `Health Status For the Server`,
        checkTime : new Date().toDateString(),
        status : 'Working',
        error : false
    })
})

export default healthRouter