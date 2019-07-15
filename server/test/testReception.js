const chai=require('chai').assert;
const reception=require('../Receptionist/reception');
const mongoose=require('mongoose');
const uuid=require('uuid/v4');

before('Create Connection',function(){
    mongoose.connect('mongodb://localhost/omingle', {useNewUrlParser: true})
    .then()
    .catch(err=>console.log(err));
});

after('Kill Connection',function(){
    mongoose.disconnect();
});

describe('isValid',function(){
    it('Should be true if no duplicates',function(done){
        reception.isValid(uuid())
        .then(stat=>{
            chai.isTrue(stat);
            done();
        })
        .catch(err=>{
            console.log(err);
            chai.fail();
            done();
        })
    });

    it('Should be false if duplicates',function(done){
        reception.isValid('2a1b1b72-8c7e-4c85-926b-1df9f6328a4d')
        .then(stat=>{
            chai.isFalse(stat);
            done();
        })
        .catch(err=>{
            console.log(err);
            chai.fail();
            done();
        })
    });
});

describe('book',function(){
    it('Should book valid uuid',(done)=>{
        reception.book(uuid())
        .then(msg=>{
            chai.equal(msg,'Saved Successfully');
            done();
        })
        .catch(err=>{
            console.log(err);
            chai.fail();
            done();
        });
    });
   
});


