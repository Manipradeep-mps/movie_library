const express=require('express')
const router=express.Router()
const trending=require('../movies_data/top_100.js')
const web_series=require('../movies_data/web_series.js')

router.get('/trending',(req,res)=>{
    res.json(trending.slice(0,10))
})

router.get('/webseries',(req,res)=>{
    res.json(web_series.slice(0,10))
})

router.post('/search',(req,res)=>{
    const data=req.body.title;
    const type=req.body.type;
    if(type== "webseries")
    {
    const response= web_series.filter(res=> res.title==data);
    res.json(response);
    }
    else if(type=="movie")
    {
        const response= trending.filter(res=> res.title==data);
        res.json(response);

    }
})

module.exports=router