const express = require('express')
require('./db/mongoose.js')
const User = require('./models/users.js')
const Task = require('./models/tasks')
const { findByIdAndUpdate } = require('./models/users.js')
const { response } = require('express')
const userRouter  = require('./router/user')
const taskRouter = require('./router/task')


const app = express()


const port = process.env.PORT 

// app.use((req,res, next)=>{
//     if(req.method === 'GET')
//     {
//         res.send('this service is currently disabled ')
//     } else{
//         next()
//     }
// })
// app.use((req,res,next)=>{
//     res.status(503).send('We are Maintaining the site services are blocked for sometimes')
// })

// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits:{
//         fileSize: 1000000
//     },
//     fileFilter( req , file , cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//            return cb(new Error('please upload a word document'))
//         }
//         cb(undefined, true)
//     }
// })
// app.post('/upload', upload.single('upload'), (req, res)=>{
//     console.log('image send')
//     res.send()
// }, (error, req, res, next)=>{
//     res.status(400).send({error: error.message})
// })




app.use(express.json())
app.use(userRouter)
app.use(taskRouter)





app.listen(port, ()=>{
    console.log('server up on port '+ port )
})



// const jwt = require('jsonwebtoken')

// const myfunction = async()=>{
//     const token = jwt.sign({_id:'vibhanshu'}, 'mynameisvibhanshu', {expiresIn:'7d'})
//     console.log(token)
//     const data =  jwt.verify(token, 'mynameisvibhanshu')
//     console.log(data)
// }

// myfunction()
//const Task = require('../src/models/tasks')

// const myfunction = async ()=>{
//     // const  task = await Task.findById('60cd6f36df0923037d75826b')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//     const user = await User.findById('60cd6f15df0923037d758269')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)

// }
// myfunction()