const mongoose=require('mongoose');
const booking=require('../Receptionist/booking');
const match=require('./match');
const sha256=require('sha256');

async function checkStatus()
{
    let status=false;

    await booking.find()
          .then(bookings=>{
            if(bookings.length%2==0) status=true;
          })
          .catch(err=>status=err);
    
    return status;
}

async function saveMatches(matches)
{
    let matchModels=[];
    let uuid1;
    let uuid2;
    let perChannel1;
    let perChannel2;
    let chatChannel;
    for(var i=0;i<matches.length;i++){
        uuid1=matches[i].elm1.uuid;
        uuid2=matches[i].elm2.uuid;
        perChannel1=matches[i].elm1.perChannel;
        perChannel2=matches[i].elm2.perChannel;
        chatChannel=sha256(uuid1+uuid2);
        var newMatch=new match({uuid1:uuid1,uuid2:uuid2,perChannel1:perChannel1,perChannel2:perChannel2,chatChannel:chatChannel});
        matchModels.push(newMatch);
    }

    match.insertMany(matchModels)
    .then(()=>console.log(''));
}

function makePairs(bookings){
    let pairs=[];
    let elm1;
    let elm2;
    let pair;
    for(var i=0;i<bookings.length;i++){
        elm1=bookings.splice(Math.floor(Math.random()*bookings.length),1)[0];
        elm2=bookings.splice(Math.floor(Math.random()*bookings.length),1)[0];
        pair={elm1,elm2};
        pairs.push(pair);
    }
    elm1=bookings.splice(Math.floor(Math.random()*bookings.length),1)[0];
    elm2=bookings.splice(Math.floor(Math.random()*bookings.length),1)[0];
    pair={elm1,elm2};
    pairs.push(pair);
    return pairs;
}

module.exports={
    makePairs,
    checkStatus,
    saveMatches
}

