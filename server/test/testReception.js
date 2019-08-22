const chai=require('chai').assert;
const sinon=require('sinon');
const reception=require('../Receptionist/reception');
const booking=require('../Receptionist/booking');
const uuid=require('uuid/v4');
const sha256=require('sha256');

describe('testReception.js',function(){
    describe('book',function(){
        before('Stubbing booking.exists',function(){
            sinon
            .stub(booking,'exists')
            .resolves(false);
        });

        after('Stub Deletion',function(){
            sinon.restore();
        });

        beforeEach('Setting up the save spy',function(){
            sinon.spy(booking,'create');
        })
        afterEach('Tearing up the save spy',function(){
            booking.create.restore();
        })

        it('Should return a private channel hash',function(done){
            const id=uuid();
            const privateChannel=sha256(id);
            reception.book(id)
            .then(msg=>{
                chai.equal(msg,privateChannel);
                done();
            })
            .catch(err=>{
                done(err);
            });
        });

        it('Should save a booking document',function(done){
            reception.book(uuid())
            .then(msg=>{
                chai.isTrue(booking.create.called);
                done();
            })
            .catch(err=>{
                done(err);
            });
        })
    })

});

