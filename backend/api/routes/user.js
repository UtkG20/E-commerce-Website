const express= require('express')
const router= express.Router();
const User= require('../model/user')
const mongoose= require('mongoose')
const bcrypt=require('bcrypt')
const jwt= require ('jsonwebtoken')

router.get('/',(req,res,next)=>{
    User.find()
    .then(result=>{
        res.status(200).json({
            users:result
        })  
    })
    .catch(err=>{
        res.status(500).json({
            message:err
        })
    })
})

router.get('/:id',(req,res,next)=>{
    User.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            userByID:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            message:err
        })
    })
})

router.post('/signup',(req,res,next)=>{
    User.find({userName:req.body.username})
    .exec()
    .then(user=>{
        if(user.length>0){
            return res.status(500).json({
                message:'username already in use'
            })
        }
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                return res.status(500).json({
                    message:err
                })
            }
            else{
                const user =new User({
                    _id:new mongoose.Types.ObjectId,
                    userName:req.body.username,
                    password:hash,
                    cart:[],
                    wishlist:[],
                    quantities:[]
    
                })
                user.update({$set:{cart:[]}})
                user.save()
                .then(result=>{
                    return res.json({
                        result:result
                    })
                })
    
                .catch(err=>{
                    return res.json({
                        message:err
                    })
                })
            }
        })
    })
    
})

router.post('/login',(req,res,next)=>{
    User.find({userName:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:'username not found'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
                return res.status(401).json({
                    message:'Either username or password is invalid'
                })
            }
            if(result){
                const token=jwt.sign({
                    username:user[0].userName,
                    userType:user[0].userType,
                    email:user[0].email
                },
                'secret key',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    username:user[0].userName,
                    _id:user[0]._id,
                    usertype:user[0].userType,
                    email:user[0].email,
                    token:token
                })
            }
        })
    })

    .catch(err=>{
        res.status(500).json({
            message:err
        })
    })
})

router.patch('/cart/:id',(req,res,next)=>{
    User.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            cart:req.body.cart,
        }
    })
    .then(result=>{
        res.status(200).json({
            previousDescription:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            message:err
        })
    })
})

router.patch('/wishlist/:id',(req,res,next)=>{
    User.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            wishlist:req.body.wishlist
        }
    })
    .then(result=>{
        res.status(200).json({
            previousDescription:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            message:err
        })
    })
})

router.patch('/quant/:id',(req,res,next)=>{
    User.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            quantities:req.body.quantities
        }
    })
    .then(result=>{
        res.status(200).json({
            previousDescription:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            message:err
        })
    })
})

module.exports=router;