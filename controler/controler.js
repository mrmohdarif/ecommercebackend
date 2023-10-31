const bcrypt = require('bcrypt')
const mongoose=require('mongoose')
const order=require('../model/order')
const db=mongoose.connection
const connection=require('../database/db')
const jwt = require('jsonwebtoken')
const registerSchema=require('../model/register')
const allproduct=require('../model/product')
const product = require('../model/product')
const Razorpay = require('razorpay');
var instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
const addProduct=(req,res)=>{
const product=allproduct.create({
    "_id": {
      "$oid": "6530e0be78275ae69e5403c7"
    },
    "id": 23,
    "title": "Nestle Milkmaid Sweetened Condensed Milk",
    "description": "Partly skimmed, sweetened condensed milk.",
    "price": "₹143",
    "originalprice": "₹144",
    "discountPercentage": 5,
    "rating": 4.85,
    "stock": 26,
    "brand": "Nestle-milkmaid Products",
    "category": "groceries",
    "thumbnail": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/full_screen/pro_10491.jpg?ts=1685979641",
    "images": [
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/sliding_image/10491a.jpg?ts=1688463545",
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/sliding_image/10491b.jpg",
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/sliding_image/10491c.jpg",
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/sliding_image/10491d.jpg",
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/sliding_image/10491e.jpg"
    ]
  })
}
const register = async(req,res) => {
    const { name, email, phone, password } = req.body
    const salt = bcrypt.genSaltSync(10);
    const encrypt = bcrypt.hashSync(password, salt);
    const tempObj = {
        uin: Date.now(),
        name: name,
        email: email,
        phone: phone,
        password: password
    }
       tempObj.password = encrypt
      const data=await registerSchema.create(tempObj)
      res.send("Register Sucessfully")
  
}

const login = async(req, res) => {
    const { email, password } = req.body
    const user_auth=await registerSchema.findOne({email:email})
    const decrypt = bcrypt.compareSync(password,user_auth.password) //it return boolean value true or false
    console.log(user_auth);
    console.log(decrypt)
        if (user_auth.email == email && decrypt) {          
           const token=jwt.sign({userId:user_auth._id},process.env.SECRET_KEY,{expiresIn:'1s'})
           console.log(token)
          // res.cookie('token',token,{expires:new Date(Date.now()+2589200000),httpOnly: true})
           res.send({"token":token,'userName':user_auth.name,'userId':user_auth._id})

        }

}
const groceriess = async(reqs, res) => {

    const all_items= await db.collection('groceries').find().toArray()
    res.send(all_items)
    
}

const phones = async(req, res) => {
   
    const all_items= await db.collection('phones').find().toArray()
    res.send(all_items)
    //    console.log(all_items)
       

}

const laptops = async(req, res) => {

    const all_items= await db.collection('laptop').find().toArray()
    res.send(all_items);
}
const watchs = async(req, res) => {
    const all_items= await db.collection('watch').find().toArray()
    res.send(all_items);
}
const headphones = async(req, res) => {
    const all_items= await db.collection('headphones').find().toArray()
    res.send(all_items);
}

const homeappliancess = async(req, res) => {
    const all_items= await db.collection('homeappliances').find().toArray()
    res.send(all_items);
}

const getcartData=async(req,res)=>{
    const {userId}=req.body;
    // console.log(userId);
    const products=await registerSchema.findOne({_id:userId}).populate('cart.product')
    console.log(products.cart);
      res.send({"insertData":products.cart})
}

const cart=async(req,res)=>{
    const {productId,userId,itemqty}=req.body;
    console.log(productId,userId,itemqty)
    // const addTocart=await registerSchema.updateOne({_id:userId},{$addToSet:{cart:productId},})
    
    const products=await registerSchema.findById(userId).then((user)=>{
        console.log("user data",user);
        if(!user)
        {
             res.send('user not found')
            console.log('user not found');
        }
        const cartItemIndex=user.cart.findIndex((value,index)=>value.product.equals(productId))
        console.log(cartItemIndex);
        if(cartItemIndex==-1)
        {
             console.log("2222222",user.cart)
             //const addTocart= registerSchema.updateOne({_id:userId},{$addToSet:{cart:{product:productId,quantity:itemqty}}})
             const productData={
                product:productId,
                quantity:itemqty
             }
             console.log(productData);
             user.cart.push(productData)
             console.log(user);
             res.send("card added sucessfully")
             return user.save()
        }
            else
            {
               user.cart[cartItemIndex].quantity+=1
               res.send("Update sucessfully")
               return user.save()
            }   
        
    })
    // const addTocart=await registerSchema.updateOne({_id:userId},{$addToSet:{cart:{product:productId,quantity:itemqty}}})
  
    // if(addTocart)
    // {
    //     return res.send("add to cart")
    // }
    // else
    // {
    //     return res.send("server error")
    // }
}

const increseqty=async(req,res)=>{
const {id,userId}=req.body
console.log(id,userId);
const user=await registerSchema.findById(userId).then((user)=>{
    // console.log(user.cart)
    user.cart.find((value,index)=>{
        if(value.product==id)
        {
            console.log(value.quantity);
            let count=value.quantity+=1
            console.log( count);
              res.send("cart Update sucessfully")
            return user.save()
        }
    })

})

// // const products=await registerSchema.findOne({_id:userId}).populate('cart.product')
//  console.log(products.cart);
// products.cart.map((item,index)=>{
//     console.log(item.product._id);
// if(item.product._id==id)
// {
//     // item.quantity++
//     console.log("tis s qty",item.quantity);
// }
// })
}
const decreseqty=async(req,res)=>{
    const {id,userId}=req.body
    console.log(id,userId);
    const user=await registerSchema.findById(userId).then((user)=>{
        // console.log(user.cart)
        user.cart.find((value,index)=>{
            if(value.product==id)
            {
                console.log(value.quantity);
                if(value.quantity==1)
                {
                    return
                }
                else
                {
                    let count=value.quantity-=1
                    console.log( count);
                      res.send(value)
                    return user.save()
                }
                
            }
        })
    
    })
}
const deleteCart=async(req,res)=>{
    const {id,userId}=req.body
    console.log(id,userId);
    // const products=await registerSchema.findOne({_id:userId}).populate('cart')
    // products.cart.map((item,index)=>{
    //     if(item._id==id)
        // {
        //    const data=item
        //    console.log("this is",data._id);
           const deleteData= await registerSchema.findOneAndUpdate({ _id:userId },{ $pull: { "cart": {_id:null} } }, { new: true }).then((user) => {
            console.log('Item removed from cart:', user);
            // console.log(deleteData);
          })
          .catch((error) => {
            console.error('Error removing item from cart:', error);
          });
         
        }
const useradress=async(req,res)=>{
const {address,userId,cart,payment}=req.body
const data=await order.create({address,cart,userId,payment})
// console.log(userId,payment)
const cartItem=await registerSchema.findByIdAndUpdate(userId,{$unset:{cart:""}})
// console.log(cartItem);
var options = {
    amount: payment.paidAmount*100,  // amount in the smallest currency unit
    currency: "INR",
  };
  instance.orders.create(options, function(err, order) {
  if(err)
  {
    return res.send({
        message: "Something Went Wrong",
    })
  }
  return res.send(order);
  }); 
// res.send("data saved sucessfully")
}
 module.exports = {register,groceriess,phones,laptops,watchs,headphones,homeappliancess,login,cart,getcartData,increseqty,decreseqty,deleteCart,useradress}

