import jwt from 'jsonwebtoken'
import { getGenericEnvValue } from '../utils/env.utils'
import { lmsLogger } from '../libs/common.logger'
import { IPayloadBody,ServiceEnum } from '../interfaces/auth/types'


  
class JsonWebTokenHelper {

    private checkJwtPayload (payload : Omit<IPayloadBody,'phoneNumber'> , options : jwt.SignOptions , accessSecretToken : string | undefined) {
            const validObjects = Object.values(payload).length > 0 && Object.values(options).length > 0
            const validAccessToken = typeof(accessSecretToken) === 'string' && accessSecretToken.length > 0
            return validAccessToken && validObjects
    }

    private getServiceToken (serviceType :  ServiceEnum) {
        switch (serviceType) {
            case ServiceEnum.ACCESS_TOKEN : {
                return getGenericEnvValue('JWT_ACCESS_SECRET_TOKEN')
            }
            case ServiceEnum.REFRESH_TOKEN : {
                return getGenericEnvValue('JWT_REFRESH_SECRET_TOKEN')
            }
            default : {
                return ''
            }
        }
    }


    public async createToken ( payloadBody : Omit<IPayloadBody,'phoneNumber'> , serviceType : ServiceEnum) {
        let processToken = true

        const payload = JSON.parse(JSON.stringify(payloadBody))

        const options : jwt.SignOptions= {
            issuer : 'Uber Shubham',
            expiresIn : serviceType.startsWith("r") ?  '24h' : '1h',
        }

        const accessSecretToken = this.getServiceToken(serviceType)

        return new Promise((resolve,_reject) => {
            try{
                const isValid = this.checkJwtPayload(payload,options,accessSecretToken)
                if(!isValid){
                    processToken = false
                    throw new Error(`The Provided Credential To Create ${serviceType} Token is not Operational `)
                }
                try{
                    const token = jwt.sign(payload,accessSecretToken as unknown as string,options)
                    if(processToken){
                        resolve(token)
                    }
                }catch(err) {
                    if(err instanceof Error) {
                        lmsLogger.error(`Error , in creating ${serviceType} token , Please Try again to,`)
                        throw err     
                    }
                    throw err
                }
               
            }catch(err){
                throw err
            }
        })
    }


    public async verifyToken(token : string, serviceType : ServiceEnum) {
        
        let validToken = true
        const secretKey = this.getServiceToken(serviceType)

        return new Promise((resolve,_reject) => {
            try{    
                const decodedPayload = jwt.verify(token as string,secretKey as jwt.Secret)
                if(Object.entries(decodedPayload).length > 0) {
                    if(validToken){
                        resolve(decodedPayload)
                    }
                }
            }catch(err : any){
                throw new Error(err.message)
            }
        })
        
    }
}

export default JsonWebTokenHelper