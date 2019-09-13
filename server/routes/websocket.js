module.exports = function(http){
    const io=require('socket.io')(http);
    const redis=require('socket.io-redis')({host:'localhost',port:'6379'});
    const emitter=require('socket.io-emitter')({host:'127.0.0.1',port:'6379'});
    const private=require('../ChatControl/privateChannelManager');
   
    const privateNamespace='/personalCh';
    const publicNamespace='/chatCh';
    
    io.of(privateNamespace).on('connection',function(socket){
        socket.on('joinRoom',async function(uuid){
            var result= await private.addUserToRoom(uuid,socket);
            socket.emit('message',result);
        });

    });

    io.of(publicNamespace).on('connection',function(socket){
        socket.on('joinRoom',function(chatChannel){
            socket.join(chatChannel);
            console.log('User joined public channel'+channel);
        });

        socket.on('leaveRoom',function(chatChannel){
            socket.leave(chatChannel);
            console.log('user disconncted from channel'+chatChannel);
        });

    });

}