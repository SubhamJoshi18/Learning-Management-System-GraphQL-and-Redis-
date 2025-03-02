import { Request,Response,NextFunction } from "express"
import { createOrganizationSchema } from "../validations/admin"
import { ICreateOrganization } from "../interfaces/auth/types"
import AdminServices from "../services/admin.service"
import { sendApiResponse } from "../utils/response.utils"

class AdminController {


    private adminServices : AdminServices
    
    constructor(){
        this.adminServices = new AdminServices()
    }


    public async createOrganization(req:Request,res:Response,next:NextFunction) {
        try{
            const content = req.body
            const parseResult : ICreateOrganization = await createOrganizationSchema.parseAsync(content)
            const graphlQlResponse = await this.adminServices.createOrganization(parseResult)
            return graphlQlResponse
        }catch(err){
            next(err)
        }
    }



}


export default new AdminController()

