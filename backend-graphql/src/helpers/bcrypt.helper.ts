import bcrypt from 'bcrypt'
import { getGenericEnvValue } from '../utils/env.utils'

class BcryptHelper {

    public async generateSalt(saltNumber : number) {
        return saltNumber > 0 ? await bcrypt.genSalt(saltNumber) : await bcrypt.genSalt(10)
    }

   
    public async hashPassword(rawPassword : string) {
        const saltNumber = Number(getGenericEnvValue('SALT'))
        const salt = await this.generateSalt(saltNumber as unknown as number)
        return await bcrypt.hash(rawPassword,salt)
    }


    public async compareHashPassword (rawPassword : string, dbPassword : string) {
        return await bcrypt.compare(rawPassword,dbPassword)
    }

    public async compareOldPassword (rawPassword : string, oldPassword : string) {
        const isMatch = await this.compareHashPassword(rawPassword,oldPassword)
        return typeof(isMatch) === 'boolean' && isMatch !== false
    }
    
}


export default BcryptHelper