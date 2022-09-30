module.exports = function (IO, REDIS, EMITTER) {
    const privateChannelManager = require('../ChatControl/privateChannelManager');

    const privateNamespace = '/personalChannel';
    const publicNamespace = '/chatChannel';

    IO.of(privateNamespace).on('connection', function (socket) {
        socket.on('joinRoom', async function (uuid) {
            const result = await privateChannelManager.addUserToRoom(uuid, socket);
            socket.emit('message', result);
        });

    });

    IO.of(publicNamespace).on('connection', function (socket) {
        socket.on('joinRoom', function (chatChannel) {
            socket.join(chatChannel);
            console.log('User joined public channel' + chatChannel);
        });

        socket.on('leaveRoom', function (chatChannel) {
            socket.leave(chatChannel);
            console.log('user disconnected from channel' + chatChannel);
        });

    });

}
