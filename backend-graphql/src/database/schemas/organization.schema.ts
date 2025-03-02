import mongoose from "mongoose";


const organizationSchema = new mongoose.Schema({

    organizationName : {
        type : String,
        required : [true,'Organization Name is Required']
    },

    type : {
        type: String,
        enum : ['School','College'],
        required : [true,'Organization Type is Required']
    },

    organizationId : {
        type : String,
        required : [true,'Organization Id is Required']
    },
        
    totalStudent : {
        type: Number,
        default : 0
    },

    organizationCreatedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    organizationStatus : {
        type : String,
        enum : ['Open','Closed'],
        default : 'Open'
    }
})


const Organization = mongoose.model('Organization',organizationSchema)
export default Organization