module.exports = function (http){
    const io=require('socket.io')(http);
    const redis=require('socket.io-redis')({host:'localhost',port:'6379'});
    const emitter=require('socket.io-emitter')({host:'127.0.0.1',port:'6379'});
    const private=require('./privateChannelManager');
    const public=require('./publicChannelManager').launch(100,emitter);

    io.of('/personalCh').on('connection',function(socket){
        socket.on('joinRoom',async function(uuid){
            var result= await private.addUserToRoom(uuid,socket);
            socket.emit('message',result);
        });

    });

    io.of('/chatCh').on('connection',function(socket){
        socket.on('joinRoom',function(chatChannel){
          socket.join(chatChannel);
          console.log('User joined public channel'+channel);
        });

        socket.on('leaveRoom',function(channel){
            socket.leave(channel);
            console.log('user disconncted from channel'+channel);
        });
    });
}  
