import mongoose from "mongoose";
import { DatabaseError } from "../exceptions";
import { lmsLogger } from "../libs/common.logger";
import { getGenericEnvValue } from "../utils/env.utils";



const connectMongo = async () => {

    let retryCount  = 4
    while(retryCount > 0) {
        try{
            const mongoUrl  = getGenericEnvValue('MONGO_URL')
            const mongoClient = await mongoose.connect(mongoUrl as string)
            return mongoClient
        }catch(err) {
            if(retryCount < 0) {
                throw new DatabaseError(`Maximum Database Connection Retry Has been Completed`)
            }else{
                retryCount = retryCount - 1
                lmsLogger.error(`Retrying the Database Connection : ${retryCount} to ${retryCount -1}`)
                continue
            }
        }
    }
      
}

export {
    connectMongo
}