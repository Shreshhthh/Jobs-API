const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema =  mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide username'],
        minlength: 3,
        maxlength: 30
    },
    email:{
        type:String,
        required:[true, 'Please provide email'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Please provide paassword'],
        minlength: 6,
        
    }
})

    userSchema.pre('save', async function(next){
        const salt =await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    })

    userSchema.methods.createJWT = function(){
        return jwt.sign({userId:this.id, name:this.name}, process.env.JWT_SECRET,{expiresIn:process.env.LIFETIME})
    }

    userSchema.methods.comparePasswords = async function(candidatePassword){
        const isMatched = await bcrypt.compare(candidatePassword, this.password)
        return isMatched
    }


module.exports = mongoose.model('User',userSchema)