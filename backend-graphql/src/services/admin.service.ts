import { BadGatewayError } from "../exceptions";
import { ICreateOrganization } from "../interfaces/auth/types";
import crypto from 'node:crypto'
import AdminRepository from "../repository/admin.repo";
import AuthRepository from "../repository/auth.repo";



class AdminServices {


    private adminRepository : AdminRepository =new AdminRepository ()
    private authRepository : AuthRepository = new AuthRepository()



        public async createOrganization(parsePayload : ICreateOrganization,userId : string) {
            
            const { organizationName, type } = parsePayload

            const checkOrganizationName = await this.adminRepository.findOrganizationName(organizationName)

            if(checkOrganizationName) throw new BadGatewayError(`There is already an Organization Name with ${organizationName}`);


            const checkUserExists = await this.authRepository.findOneId(userId)
            
            if(!checkUserExists) throw new BadGatewayError(`The User Does not Exists on the System`);
        
            const payloadOrg = {
                organizationName,
                type,
                organizationCreatedBy : userId
            } as any

            const payloadString = JSON.stringify(payloadOrg);

    
            const organizationId = crypto.createHash('sha256')
                .update(payloadString)
                .digest('hex');

            const isOrganizationIdExists = 'organizationId' in payloadOrg && payloadOrg.hasOwnProperty('organizationId')
            if(!isOrganizationIdExists) {payloadOrg.organizationId = organizationId;}
            const insertResult = await this.adminRepository.saveOrganizationCredentials(payloadOrg)
            return insertResult
        }

}

export default new AdminServices()