const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Creating Schema 
const matchSchema=new Schema({
    uuid1:{
        type:String,
        required:true
    },
    uuid2:{
        type:String,
        required:true
    },
    perChannel1:{
        type:String,
        required:true
    },
    perChannel2:{
        type:String,
        required:true
    },
    chatChannel:{
        type:String,
        required:true
    }
});

module.exports= match=mongoose.model('match',matchSchema);