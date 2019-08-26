const private=require('../ChatControl/privateChannelManager');
const chai=require('chai').assert;
const sinon=require('sinon');

describe('testPrivateChannelManager.js',function(){
    describe('addUserToRoom',function(){
        beforeEach('Stubbing booking.exists and booking.findOne',function(){
            sinon.stub(booking,'exists')
            .resolves(true);
            sinon.stub(booking,'findOne')
            .resolves({ _id: '5d297a87af7a9d433329b4b5',
            uuid: '7fc1e382-9f75-4155-bd09-d702ac85ab4b',
            perChannel:
            '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
            __v: 0 });
        });
        
        afterEach('Stub Deletion and kill server',function(){
            sinon.restore();
        });
    
        it('Should add a socket to a room succesfully',function(done){
            var socket={ join: function(room) {} };
            sinon.spy(socket,'join');
            private.addUserToRoom('7fc1e382-9f75-4155-bd09-d702ac85ab4b',socket)
            .then(()=>{
                chai.isTrue(socket.join.calledOnceWith('75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d'),1);
                done();
            })
            .catch(err=>{
                done(err);
            });
        });

        it('Should Return a message like this: "User has joined the channel" ',function(done){
            var socket={ join: function(room) {} };

            private.addUserToRoom('7fc1e382-9f75-4155-bd09-d702ac85ab4b',socket)
            .then(result=>{
                chai.equal(result,"User has joined the channel");
                done();
            })
            .catch(err=>{
                done(err);
            });
        });

    });

});
