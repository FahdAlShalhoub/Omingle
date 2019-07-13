const chai=require('chai').assert;
const reception=require('../Receptionist/reception');
const mongoose=require('mongoose');
const uuid=require('uuid/v4');

mongoose.connect('mongodb://localhost/omingle', {useNewUrlParser: true})
.then(()=>console.log('Connection To DB Successful'))
.catch(err=>console.log(err));

describe('book()',function(){
    it('Non-duplicated uuid should be saved successfully',()=>{
        return reception.book(uuid());
    });
   
});


