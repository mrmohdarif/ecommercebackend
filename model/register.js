const mongoose=require('mongoose')
const {Schema,model}=mongoose
const registerSchema=new Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
     type:String,
     required:true,
     unique: [true,'email alreay reagister']
    },
    phone:{
        type:Number,
        required:true,
        unique: [true,'phone number alreay reagister'],
    },
    password:{
        type:String,
        required:true,
        unique: [true,'password allreadyreagister']
    },
    cart:[{product:{type:Schema.Types.ObjectId, ref:'allproduct'},quantity:{type: Number,default: 1}}],
  
    
})
const register=model("register",registerSchema)
module.exports=register;


//making product schema is very