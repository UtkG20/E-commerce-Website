const mongoose= require('mongoose')
const userSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName:String,
    password:String,
    cart:Array,
    wishlist:Array,
    email:String,
    userType:String,
    quantities:Array
});

module.exports=mongoose.model('User',userSchema);