const booking = require('./booking');
const sha256 = require('sha256');

//Signs the new user to the waiting list.
async function book(uuid) {
    const exists = await booking.exists({uuid: uuid});

    if (exists) {
        throw new Error('Duplicate UUID');
    }

    const channel = sha256(uuid);

    await booking.create({uuid: uuid, perChannel: channel})

    return channel;
}

module.exports = {
    book
};


