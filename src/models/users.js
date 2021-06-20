const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const { findOne } = require('./tasks')
const Task = require('./tasks')



const userSchema = new mongoose.Schema({
    Name:{
        type: String ,
        required : true ,
        trim : true
    },
    Email :{
        type: String ,
        unique : true , 
        required : true ,
        trim : true ,
        lowercase: true , 
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Email is not valid , enter a valid email')
            }
        }

    },
    password:{
        type : String,
        required : true ,
        trim: true ,
        minlength: 7 ,
        validate(value){
            if(value.toLowerCase().includes("password"))
            {
                throw new Error('password cannot be the password')
            }
        }
    },
Age:{
        type: Number,
        default: 0 ,
        validate(value){
            if(value<0)
            {
                throw  new Error('age should be a number ')
            }
        } 
    },
  tokens:[{
     token:{
         type: String , 
         required: true 
      }
    }
  ], 
  avatar:{
      type: Buffer
  }

}, {
    timestamps:true 
})

userSchema.virtual('tasks',{
   ref:'Task',
   localField: '_id',
   foreignField: 'owner'
})

userSchema.statics.findByCredentials= async (Email, password)=>{
 const user = await User.findOne({Email})
 if(!user)
 {
    throw new Error('Unable to login ')
 }
 const ismatch = await bcrypt.compare(password, user.password)
 if(!ismatch){
     throw new Error('Unable to login')
 }
 return user 
}
userSchema.methods.generateAuthToken = async function (){ 
    const user = this 
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)
    user.tokens  = user.tokens.concat({token})
    await user.save()
    return token 

}
userSchema.methods.toJSON =  function (){
    const user = this 
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar 
    return userObject
}


userSchema.pre('save', async function (next){
    const user = this 
    console.log('new user added ')
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()

})
userSchema.pre('remove', async function (next){
    const user= this 
    await Task.deleteMany({owner:user._id})
    next()
})
const User = mongoose.model('User', userSchema)


module.exports = User