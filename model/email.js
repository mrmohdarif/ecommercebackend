const mongoose=require('mongoose')
const{Schema,model}=mongoose
const emailsubscribeschema=new Schema({
    email:{
        type:String
    }
})
const emailSubscribe=model('subscribe',emailsubscribeschema)
module.exports=emailSubscribe