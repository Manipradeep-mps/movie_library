const express=require('express')
const router=express.Router()

const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

const formmodel=require('../models/formmodel')

router.post('/',(req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    let confirmpassword=req.body.confirmpassword;
    let pic=req.body.pic;

    if(password!=confirmpassword)
        {
             res.json("Password and Confirm password not matched")
        }
    if(name==''||email==''||password=='')
    {
        res.json("The fields should not be empty")
    }
    else if(!/^[A-Za-zÀ-ÖØ-öø-ÿ-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ-]+)*$/.test(name))
    {
        res.json("Please enter a valid name")
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    {
        res.json("Please enter a valid email id")
    }
    else if(password.length<8)
    {
        res.json("Password should be atleast Eight characters")
    }
    else
    {
        formmodel.find({email})
        .then(result=>{
            if(result.length)
            {
                res.json("User already exists")
            }
            else{
                
                const salt=10;
                 bcrypt.hash(password,salt)
                .then(hashedpassword=>{
                    const obj={
                        "name":name,
                        "email":email,
                        "password":hashedpassword,
                        "pic":pic
                    }
                    formmodel(obj).save()
                    .then(result=>{
                        const curruser={
                            id:result.id,
                            useremail:email
                        }
            
                        const accesstoken=jwt.sign(curruser,process.env.jwt_secret_key)
                    
                        res.json({
                            accessToken: accesstoken,
                            message: "Registration successful !!!"
                          });
                    
                    })
                    .catch(err=>{
                        console.log(err);
                        
                        res.json("Error")
                    })

                })
                .catch(err=>{
                    res.json("Error while hashing the password")
                })
                

            }
        
        })
    }
    
})

module.exports=router