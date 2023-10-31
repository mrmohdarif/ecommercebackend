const mongoose=require('mongoose')
const url="mongodb+srv://alliswell5solution:Mohd1999@cluster0.l8esa1z.mongodb.net/"
const options={
    dbName:"mainstreet" //database name
}
const connection=async()=>{
    try{
    mongoose.connect(url,options).then((res)=>{
        console.log("connection is fine");
    }).catch((err)=>{
        console.log("conection is not fine",err);
    })
    }
    catch(err)
    {
    console.log(err);
    }
    }
    module.exports=connection







// alliswell5solution
// Mohd1999