import Organization from "../database/schemas/organization.schema"


class AdminRepository {


    public async findOrganizationName(organizationName : string) {

        const searchResult = await Organization.findOne(
            {
                organizationName : organizationName
            }
        )
        return searchResult
    }

    public async saveOrganizationCredentials(payload : {organizationName : string, type : string, organizationId : string}) {
        const saveResult = await Organization.create(
            {
                ...payload
            }
        )
        return saveResult
    }

}


export default AdminRepository