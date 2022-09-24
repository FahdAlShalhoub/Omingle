module.exports = function (IO, REDIS, EMITTER) {
    const io = IO;
    const privateChannelManager = require('../ChatControl/privateChannelManager');

    const privateNamespace = '/personalCh';
    const publicNamespace = '/chatCh';

    io.of(privateNamespace).on('connection', function (socket) {
        socket.on('joinRoom', async function (uuid) {
            const result = await privateChannelManager.addUserToRoom(uuid, socket);
            socket.emit('message', result);
        });

    });

    io.of(publicNamespace).on('connection', function (socket) {
        socket.on('joinRoom', function (chatChannel) {
            socket.join(chatChannel);
            console.log('User joined public channel' + channel);
        });

        socket.on('leaveRoom', function (chatChannel) {
            socket.leave(chatChannel);
            console.log('user disconncted from channel' + chatChannel);
        });

    });

}
