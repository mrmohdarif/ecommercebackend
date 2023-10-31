const mongoose=require('mongoose')
const {model,Schema}=mongoose
const loginSchema=new Schema({
email:{
 type:String

},
password:{
    type:String
}


})

const login=model('login',loginSchema)
module.exports=login