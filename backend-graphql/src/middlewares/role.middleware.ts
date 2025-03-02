import { NextFunction, Request,Response } from "express";
import { lmsLogger } from "../libs/common.logger";
import { BadGatewayError } from "../exceptions";


const isAdmin = (req:Request,res:Response,next:NextFunction) => {

    let validRole = true
    
    const userRole = req.user.role
    
    const validAdminRole = userRole.includes('admin') 

    if(typeof userRole === 'string' && validAdminRole) {
        lmsLogger.info(`The Admin has the Right Access for the Route :${req.originalUrl}`)
        next()
    }else{
        validRole  = false
        throw new BadGatewayError(`The Role Does not have The Right Permission`)
    }
}


export {
    isAdmin
}