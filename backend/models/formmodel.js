const mongoose=require('mongoose')

const obj={

    "name":String,
    "email":String,
    "password":String,
    "pic":{type:String,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
}

const formschema=mongoose.Schema(obj);
const formmodel=mongoose.model('userdata',formschema);

module.exports=formmodel