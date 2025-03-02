import dotenv from 'dotenv'
dotenv.config()


const checkEnvValue = (key : string) : boolean => {
    let envExists = true
    return process.env[key] && process.env.hasOwnProperty(key) ? envExists : !envExists
}


const getGenericEnvValue = (key : string) : string | undefined => {
        return checkEnvValue(key) ? process.env[key] : ''
}

export {
    getGenericEnvValue
}