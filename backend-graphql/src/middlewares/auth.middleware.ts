import {Request,Response,NextFunction} from 'express'
import { BadGatewayError } from '../exceptions'
import { ServiceEnum } from '../interfaces/auth/types'
import JsonWebTokenHelper from '../helpers/jwt.helper'


declare global {
    namespace Express {
      interface Request {
        user?:any
      }
    }
  }

export const verifyAuthToken = async  (req:Request,_res:Response,next:NextFunction) => {
    const jwtHelper = new JsonWebTokenHelper()
    try{
        const headersToken = extractHeaderToken(req)

        if(headersToken.length.toString().startsWith('0')) {
            throw new BadGatewayError(`The Token is Empty , or It is not operational..`)
        }
        const decodedPayload : any =  await jwtHelper.verifyToken(headersToken,ServiceEnum.ACCESS_TOKEN)

        if(!decodedPayload.hasOwnProperty('accessToken')){
            decodedPayload['accessToken'] = headersToken
        }

        req.user = decodedPayload
        return next()
    
    }catch(err:any){
        throw new BadGatewayError(err.message)
    }
}


const extractHeaderToken = (reqHeaders : Request) => {
        const token =  reqHeaders.headers.authorization ?? reqHeaders.headers['authorization']
        if(!token){
            throw new BadGatewayError(`Token is not Available on the Request Headers`)
        }
        return checkConnection(reqHeaders.headers.connection as string) ? token : ''
}



const checkConnection = (conenction_type : string) =>  {
     return typeof(conenction_type) === 'string' && conenction_type.split('-').includes('alive') 
}