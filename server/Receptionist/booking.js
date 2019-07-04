const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Creating Schema
const bookingSchema=new Schema({
    uuid:{
        type: String,
        required: true
    },
    perChannel:{
        type: String,
        required:true  
    }
});

module.exports= booking = mongoose.model('booking',bookingSchema); 