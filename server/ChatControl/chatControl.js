let io=require('socket.io');
const private=require('./privateChannelManager');
// let redis=require('socket.io-redis');
// const public=require('./publicChannelManager');

function launch(http)
{
    io=io(http);
    // redis=redis({host:'localhost',port:'6379'});

    io.of('/personalCh').on('connection',function(socket){
        socket.on('joinRoom',async function(uuid){
            var result= await private.addUserToRoom(uuid,socket);
            socket.emit('message',result);
        });

    });

    io.of('/chatCh').on('connection',function(socket){

    });
}  

function close()
{
    io.close();
}

module.exports={
    launch,
    close
}