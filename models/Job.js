const mongoose = require('mongoose')

const JobsSchema = mongoose.Schema({
    company:{
        type:String,
        required:[true,'Please provide the company name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,'Please provide the position'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['pending','interview','declined'],
        default:'pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide the user']
    }
},{timestamps:true})

module.exports = mongoose.model('Jobs',JobsSchema)