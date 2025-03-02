import mongoose from "mongoose";
import { formattedMongooseMessage } from '../../utils/transformData.utils'


const UserProfileSchema = new mongoose.Schema({
    isActive : {
        type : Boolean,
        default : true
    },
    image :  {
        type : String,
        default :''
    },

    SecondaryEmail : {
        type : String,
        default : ''
    },

    isRider : {
        type : Boolean,
        default : false
    },

    location : {
        type : String,
        default : ''
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true,formattedMongooseMessage('User')]
    }

}, {
    timestamps : true
})


const userProfileModel = mongoose.model('UserProfile',UserProfileSchema)
export default userProfileModel