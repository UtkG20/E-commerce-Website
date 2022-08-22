const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
const Product= require('../model/products');

router.post('/',(req,res,next)=>{
    const product=new Product({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        img:req.body.img,
        brand:req.body.brand,
        price:req.body.price,
        categories:req.body.category,
        countries:req.body.countries
    })

    product.save()
    .then(result=>{
        res.status(200).json({
            newProduct:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.get('/',(req,res,next)=>{
    Product.find()
    .then(result=>{
        res.status(200).json({
            products:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.get('/:id',(req,res,next)=>{
    Product.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            productByID:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.put('/:id',(req,res,next)=>{
    Product.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            img:req.body.img,
            brand:req.body.brand,
            price:req.body.price
        }
    })
    .then(result=>{
        res.status(200).json({
            oldProduct:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.delete('/:id',(res,req,next)=>{
    Product.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'product deleted'
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports=router;