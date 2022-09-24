const booking = require('../Receptionist/booking');

async function addUserToRoom(uuid, socket) {
    if (!await booking.exists({uuid: uuid})) {
        return "User Has not made a booking"
    }

    const booking1 = await booking.findOne({uuid: uuid})
    socket.join(booking1.perChannel);

    return "User has joined the channel";
}

module.exports = {
    addUserToRoom,
}
