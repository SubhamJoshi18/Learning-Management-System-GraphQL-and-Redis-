import mongoose from "mongoose";
import { formattedMongooseMessage } from '../../utils/transformData.utils'

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, formattedMongooseMessage('username')]
    },

    email : {
        type : String,
        required: [true,formattedMongooseMessage('email')]
    },

    phoneNumber : {
        type : String,
        required : [true,formattedMongooseMessage('phoneNumber')]
    },

    password  : {
        type : String,
        required : [true,formattedMongooseMessage('password')]
    },

    role : {
        type : String,
        enum : ['student','teacher','admin','user'],
        default : 'user'
    },

    userProfile : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'UserProfile',
    }
},
{
    timestamps : true
})


const User = mongoose.model('User',userSchema)
export default User