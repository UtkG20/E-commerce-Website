const express= require('express')
const router= express.Router();
const Student= require('../model/students') //importing Student schema 
const mongoose= require('mongoose')

// fetch complete array of data
router.get('/',(req,res,next)=>{
    Student.find()
    .then(result=>{
        res.status(200).json({
            studentData:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//fetch single data by its id
router.get('/:id',(req,res,next)=>{
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            studentById:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    
})

//deleting data from the database
router.delete('/:id',(req,res,next)=>{
    Student.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'student account deleted',
            result:result        //...this result is neither the remaining data nor the deleted one
        })
    })

    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

// adding data in the database
router.post('/',(req,res,next)=>{
    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        gender:req.body.gender,
        phone:req.body.phone,
        email:req.body.email
    })

    student.save()
    .then(result=>{
        console.log(student);
        res.status(200).json({
            newStudent:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

// put request for updating the Data
router.put('/:id',(req,res,next)=>{
    Student.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            gender:req.body.gender,
            phone:req.body.phone,
            email:req.body.email
        }
    })
    .then(result=>{
        res.status(200).json({
            old_student:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports=router;