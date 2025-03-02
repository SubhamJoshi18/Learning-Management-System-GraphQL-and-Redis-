import  {Request,Response,NextFunction} from 'express'
import { registerUserSchema,forgetPasswordSchema,resetPasswordSchema,loginSchemaBody} from '../validations/auth'
import { validateBody } from '../validations/validator'
import AuthService from '../services/auth.service'
import { ILoginBody,IRegisterBody } from '../interfaces/auth/types'
import { sendApiResponse } from '../utils/response.utils'

class AuthController {

    private authServices : AuthService
    
    constructor() {
        this.authServices = new AuthService()
    }
    
    public registerUser = async (req : Request,res : Response,next : NextFunction) : Promise<void> => {
            try{
                const content = req.body
                const parseBody = validateBody(content,registerUserSchema)
                const apiResposne  = await this.authServices.registerServices(parseBody as object as IRegisterBody)
                sendApiResponse(res,apiResposne,`Registered SuccessFully Completed`)
            }catch(err){
                    next(err)
            }
    }

    public loginUser = async (req:Request,res:Response,next:NextFunction) : Promise<void> => {
        try{
            const content = req.body
            const parseBody = validateBody(content,loginSchemaBody)
            const apiResponse = await this.authServices.loginServices(parseBody as ILoginBody)
            sendApiResponse(res,apiResponse,`Login Successfully Completed`)
        }catch(err){
            next(err)
        }
    }

    public LogoutUser = async (req:Request,res:Response,next:NextFunction) : Promise<void> => {
            try{
                const accessToken = req.user.accessToken
                const apiResponse = await this.authServices.logOutServices(accessToken as string)
                sendApiResponse(res,apiResponse,`Log out Successfully`) 
            }catch(err){
                next(err)
            }
    }

    public ForgetPassword = async (req:Request,res:Response,next:NextFunction) : Promise<void> => {
            try{
                const contents = req.body
                const parseBody = validateBody(contents,forgetPasswordSchema)
                const apiResponse = await this.authServices.forgetPasswordServices(parseBody as {email :string})
                sendApiResponse(res,apiResponse,'Email Sended Successfully')               
            }catch(err){
                next(err)
            }
    }

    public CheckPasswordToken = async (req :  Request, res:Response, next:NextFunction) => {
        try{
            const token = req.params.token
            const apiResponse = await this.authServices.checkResetLink(token as string)
            sendApiResponse(res,apiResponse,'Token Validate Successfully')
        }catch(err) {
            next(err)
        }
    }

    public ResetPassword = async (req:Request,res:Response,next:NextFunction) => {
            try{
                const contents = req.body
                const userId = req.params.userId
                const parseBody = validateBody(contents,resetPasswordSchema)
                const apiResponse = await this.authServices.ResetPassword(userId,parseBody as {password : string})
                sendApiResponse(res,apiResponse,`The Password Has been Successfully Reset`)
            }catch(err){
                next(err)
            }
    }
}


export default new AuthController()