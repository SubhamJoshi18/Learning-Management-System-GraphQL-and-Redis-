

interface ISignUp {
    studentEmail : string
    studentName : string
    studentFaculty : string
    studentSemester : string
}

type OrgType = 'School' | 'College'


interface ICreateOrganization {
    organizationName : string
    type : OrgType
}
interface IRegisterBody {
    username : string
    password : string
    email : string   
    phoneNumber : string
}

interface ILoginBody {
    username : string
    password : string
}

interface IPayloadBody {
    _id : any
    username : string
    email : string
    phoneNumber : string
}

enum ServiceEnum {
    ACCESS_TOKEN = 'accesstoken',
    REFRESH_TOKEN = 'refreshtoken'
}




export {
    ISignUp,
    ICreateOrganization,
    IRegisterBody,
    ILoginBody,
    IPayloadBody,
    ServiceEnum
}