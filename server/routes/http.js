const express =require('express');
const router=express.Router();
const reception=require('../Receptionist/reception');
const public=require('../ChatControl/publicChannelManager');
const matchmaker=require('../Matchmaker/matchmaker');
const redis=require('socket.io-redis')({host:'localhost',port:'6379'});
const emitter=require('socket.io-emitter')({host:'127.0.0.1',port:'6379'});

//MiddleWare
router.use(function log(req,res,next){
    console.log("---------------------------");
    console.log('Request: '+req.path);
    console.log("Time: "+new Date().toISOString().replace(/T/,' ').replace(/\..+/, '')); //The Time Is 0 GMT
    console.log("UUID: "+req.query.uuid);
    console.log("---------------------------\n");
    next();
});

//Routes
router.get('/book',(req,res)=>{
    reception.book(req.query.uuid)
    .then(msg=>{
        res.send({
            status:200,
            message: 'You have been succesfully booked',
            channel:msg
        });
    })
    .catch(err=>{
        res.status(400).send({
            status:400,
            message:err.message
        });
    });
});

router.get('/runMatchmaker',(req,res)=>{
    matchmaker.launch(req.query.bookings)
    .then(msg=>{
        res.send({
            status:200,
            message:msg
        });
    })
    .catch(err=>{
        res.status(400).send({
            status:400,
            message:err.message
        });
    });
});

router.get('/runPublicChannelDistributer',(req,res)=>{
    public
});

module.exports=router;