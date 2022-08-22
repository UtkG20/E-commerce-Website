const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    img:String,
    price:Number,
    brand:String,
    categories:Array,
    countries:Array
})

module.exports=mongoose.model('Product',productSchema);