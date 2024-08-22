const express=require('express')
const router=express.Router()

const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

const formmodel=require('../models/formmodel')

router.post('/',(req,res)=>{
    let email
    let password
    email=req.body.email;
    password=req.body.password;
  
    if(email=='' || password=='')
    {
        res.json("The fields can't be empty!")
    }
    else{
    formmodel.find({email})
    .then(result=>{
        if(result.length){
            const hps=result[0].password
            bcrypt.compare(password,hps)
            .then((resp=>{
                if(resp){
                    const curruser={
                        useremail:email,
                        id:result[0].id
                    }
                    const accesstoken=jwt.sign(curruser,process.env.jwt_secret_key)
                    res.json({
                        accessToken: accesstoken,
                        message: "Login successful !!!"
                      });
                }
                else
                {
                    res.json("Invalid Credentials")
                    
                }
            }))
            .catch(err=>{
                res.send("Error in ps compare")
            })
            
        }
        else
        {
            res.json("User does not exists")
        }
    })
    .catch(err=>{
        res.json("Error in find")
    })
}
})

module.exports=router

