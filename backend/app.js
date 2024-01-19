const express= require('express');
const studentRoute=require('./api/routes/students');
const userRoute=require('./api/routes/user');
const productRoute = require('./api/routes/products');
const mongoose=require ('mongoose');
const bodyparser=require('body-parser');
const cors= require('cors');
mongoose.connect('mongodb+srv://goyalgoyal9784:THFfXn4JKOUoHUuB@e-commerce.zvwqbk9.mongodb.net/?retryWrites=true&w=majority')

mongoose.connection.on('error',(error)=>{
    console.log('connection failed');
})
mongoose.connection.on('connected',connected=>{
    console.log('connected successfully with database....');
})
const app=express();

app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

// Routing to student.js file
app.use('/students',studentRoute);
app.use('/user',userRoute);
app.use('/products',productRoute);

// routing to this app page only
app.use((req,res)=>{
    res.end('app page working')
})

module.exports=app
//database connection