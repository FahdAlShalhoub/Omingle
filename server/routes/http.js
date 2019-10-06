const express =require('express');
const router=express.Router();
const reception=require('../Receptionist/reception');
const public=require('../ChatControl/publicChannelManager');
const matchmaker=require('../Matchmaker/matchmaker');

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
    if(req.query.signature != 'hello'){
        res.status(401).send({
            msg:'Invalid Signature'
        });
    } else {
        matchmaker.launch(JSON.parse(req.query.bookings).bookings)
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
    }
});

router.get('/runPublicChannelManager',(req,res)=>{
    if(req.query.signature != 'Hello2'){
        res.status(401).send({
            msg:'Invalid Signature'
        });
    } else{
        public.distributeChannels(req.io.of('/chatCh'))
        .then(msg=>{
            res.send({
                status:200,
                msg:msg
            });
        })
        .catch(err=>{
            res.status(400).send({
                status:400,
                msg:err
            });
        });
    }
});

module.exports=router;