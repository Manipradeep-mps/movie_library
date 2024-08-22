const express=require('express')
const router=express.Router()
const listmodel=require('../models/listmodel')

router.post('/getlistinfo',async (req,res)=>{
  const id=req.body.id
  try{
     const info = await listmodel.findOne({ _id: id })
     if(info==null)
     {
      res.json("No data found")
     }
     res.json(info);

  }
  catch(err){
      res.json("Error ocurred")
  }
})

router.post('/create',(req,res)=>{
    const data=req.body;
    try{
    listmodel(data).save()
    .then(result=>{
        res.json(result);
    })
    }
    catch(err){
        res.json(err)
    }
})
router.post('/add',async (req,res)=>{
    const userid=req.body.id;
    const listname=req.body.listname;
    const moviedata=req.body.listdata;
     try{
    const list=await listmodel.findOne({userid,listname})
      if(list==null || list.length==0){
        res.json("List Not Found")
      }

      const exists = list.listdata.some(item => 
        item.title === moviedata.title && 
        item.year === moviedata.year
        );

    if (exists) {
        return res.json("Item Already Exists in the list");
    }
       
      list.listdata.push(moviedata)
      await list.save()
      res.json("Success")
     }
     catch(err){
        res.json("Error")
     }



})
router.post('/delete-item',async (req,res)=>{
    const userid=req.body.userid;
    const listname=req.body.listname;
    const item_name=req.body.item_name;
    try{
      const result = await listmodel.updateOne(
        { userid, listname },
        { $pull: { listdata: { title: item_name } } }
    );
    
     if (result.modifiedCount > 0) {
        res.json("Success");
     } else {
        res.json("Item not found or already removed");
    }

    }
    catch(err)
    {
       res.json("Error")
    }


})
router.post('/delete-list',async(req,res)=>{
    const userid=req.body.userid;
    const listname=req.body.listname;
    try
    {
    const result=await listmodel.deleteOne({userid:userid,listname:listname})
    if(result.deletedCount>0){
      res.json("List Deleted Successfully")
    }
    else
    {
    res.json("List not found or Deletion failed")
    }
    }
    catch(err)
    {
      res.json("Error")
    }

}
)
router.post('/display',async(req,res)=>{
    const userid=req.body.userid;
    try{
          const info=await listmodel.find({userid})
          if(info.length==0)
          {
            res.json("No list found");
          }
          else
          {
            res.json(info)
          }
    }
    catch(err){
        res.json("Error")
    }
})


module.exports=router;