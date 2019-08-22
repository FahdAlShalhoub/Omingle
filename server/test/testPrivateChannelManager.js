const app=require('express')();
const http=require('http').createServer(app).listen(5000);
const chatControl=require('../ChatControl/chatControl');
chatControl.launch(http);

const private=require('../ChatControl/privateChannelManager');
const client=require('socket.io-client');
const chai=require('chai').assert;
const sinon=require('sinon');

describe('privateChannelManager.js',function(){

    before('Stubbing booking.exists and booking.findOne',function(){
        sinon.stub(booking,'exists')
        .resolves(true);
        sinon.stub(booking,'findOne')
        .resolves({ _id: '5d297a87af7a9d433329b4b5',
        uuid: '7fc1e382-9f75-4155-bd09-d702ac85ab4b',
        perChannel:
        '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
        __v: 0 });
    });
    after('Stub Deletion and kill server',function(){
        chatControl.close();
        http.close();
        sinon.restore();
    });

    it('Should add a socket to a room successfully',function(done){
        var socket=client.connect('http://localhost:5000/personalCh');
        socket.on('connect',function(){
            socket.emit('joinRoom','7fc1e382-9f75-4155-bd09-d702ac85ab4b');
        });
       
        socket.on('message',function(msg){
            chai.equal(msg,'User has joined the channel');
            done();
        });
    });

});
