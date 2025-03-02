import {Router} from 'express'
import AuthController from '../controller/auth.controller'
import { verifyAuthToken } from '../middlewares/auth.middleware'


const authRouter  : Router = Router()

authRouter.post('/register',AuthController.registerUser)
authRouter.post('/login',AuthController.loginUser)
authRouter.post('/logout',verifyAuthToken,AuthController.LogoutUser)
authRouter.post('/forget-password',AuthController.ForgetPassword)
authRouter.get('/reset-link/:token/:userId',AuthController.CheckPasswordToken)
authRouter.post('/reset-password/:userId',AuthController.ResetPassword)



export default authRouter
