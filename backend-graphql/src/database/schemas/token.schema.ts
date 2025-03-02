import mongoose from "mongoose";
import { formattedMongooseMessage } from '../../utils/transformData.utils'

const TokenModel = new mongoose.Schema({

    token : {
        type :String,
        required: [true,formattedMongooseMessage('token')]
    },

    expiresIn : {
        type : Date,
        default : new Date(),
    }
}, {
    timestamps  : true
})

const Token = mongoose.model('Token',TokenModel)
export default Token