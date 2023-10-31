const mongoose=require('mongoose')
const {Schema,model}=mongoose

const orderSchema=Schema({
   userId:{
    type:String,
   },
   address:[],
   cart:[],
   payment:[],
   
},
{
   timestamps: true
 })
const orderschema=model('order',orderSchema)
module.exports=orderschema