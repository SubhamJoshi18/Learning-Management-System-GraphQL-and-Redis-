import { Request,Response,NextFunction } from "express"
import { createOrganizationSchema } from "../validations/admin"
import { ICreateOrganization } from "../interfaces/auth/types"
import AdminServices from "../services/admin.service"
import { sendApiResponse } from "../utils/response.utils"

class AdminController {


   
    public async createOrganization(req:Request,res:Response,next:NextFunction) {
        try{
            const content = req.body
            const userId = req.user._id
            const parseResult : ICreateOrganization = await createOrganizationSchema.parseAsync(content)
            const apiResponse = await AdminServices.createOrganization(parseResult,userId)
            return sendApiResponse(res,apiResponse,`Organization have been Created`)
        }catch(err){
            next(err)
        }
    }



}


export default new AdminController()

