import { Router } from "express";
import { verifyAuthToken } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/role.middleware";
import AdminController from "../controller/admin.controller";


const adminRouter = Router()


adminRouter.post('/admin/create/organization',verifyAuthToken,isAdmin,AdminController.createOrganization as any)


export default adminRouter