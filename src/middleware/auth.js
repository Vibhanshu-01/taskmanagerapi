const User = require('../models/users')
const jwt = require('jsonwebtoken')
const { findOne } = require('../models/users')

const auth = async(req,res,next)=>{
    try {
    const token =   req.header('Authorization').replace('Bearer ','')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({_id:decoded._id , 'tokens.token':token })
    if(!user)
    {
        throw new Error()
    }
    res.token = token
    req.user = user 
    }catch(e){
        res.status(401).send({error: 'please Authenticate' })
    }
    next()
}

module.exports = auth 