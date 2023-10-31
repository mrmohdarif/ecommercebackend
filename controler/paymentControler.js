const Razorpay = require('razorpay');
var crypto = require('crypto');
var hash = crypto.createHash('sha256');
var instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
  
  const order=(req,res)=>{
    const {amount}=req.body
    let real_amount=amount-amount*10/100
    console.log(real_amount);
    var options = {
        amount: real_amount*100,  // amount in the smallest currency unit
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
  }
 
// const paymentVerify=(req,res)=>{
// const data=req.body

// console.log(data.response.razorpay_payment_id,data.response.razorpay_order_id,data.response.razorpay_signature)
// generated_signature = hash(data.response.razorpay_order_id + "|" + data.response.razorpay_payment_id, process.env.key_secret);

//   if (generated_signature == data.response.razorpay_signature) {
//     res.send('payment is successful')
//   }
// }


  module.exports={order}
  