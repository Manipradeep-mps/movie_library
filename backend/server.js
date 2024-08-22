const express=require('express')
const mongoose =require('mongoose')
const cors=require('cors')

const app=express()
app.use(express.json())
app.use(cors())
app.listen(8080);
require('dotenv').config()

const mongouri=process.env.mongo_uri;
mongoose.connection.on('connected',()=>{
    console.log("Connected")
})

mongoose.connect(mongouri)

const loginRoute=require('./routes/loginRoute')
const signupRoute=require('./routes/signupRoute')
const infoRoute=require('./routes/infoRoutes')
const listRoute=require('./routes/listRoutes')

app.use('/signup',signupRoute)
app.use('/login',loginRoute)
app.use('/info',infoRoute)
app.use('/list',listRoute)





