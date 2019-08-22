const express =require('express');
const router=express.Router();
const reception=require('../Receptionist/reception');
// const ChatControl=require('chatControl');

//MiddleWare
router.use(function log(req,res,next){
    console.log("---------------------------");
    console.log('Request: '+req.originalUrl);
    console.log("Time: "+new Date().toISOString().replace(/T/,' ').replace(/\..+/, '')); //The Time Is 0 GMT
    console.log("UUID: "+req.header("uuid"));
    console.log("---------------------------\n");
    next();
});

//Routes
router.get('/book',(req,res)=>{
    reception.book(req.header('uuid'))
    .then(msg=>res.json(msg))
    .catch(err=>res.json(err.message));
});

module.exports=router;