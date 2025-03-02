import { BadGatewayError } from "../exceptions";
import { ICreateOrganization } from "../interfaces/auth/types";
import crypto from 'node:crypto'
import AdminRepository from "../repository/admin.repo";



class AdminServices {


    private adminRepository : AdminRepository

    constructor(){
        this.adminRepository = new AdminRepository()
    }

        public async createOrganization(parsePayload : ICreateOrganization) {
            
            const { organizationName, type } = parsePayload

            const checkOrganizationName = await this.adminRepository.findOrganizationName(organizationName)

            if(checkOrganizationName) throw new BadGatewayError(`There is already an Organization Name with ${organizationName}`);


            const payloadOrg = {
                organizationName,
                type,
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

export default AdminServices