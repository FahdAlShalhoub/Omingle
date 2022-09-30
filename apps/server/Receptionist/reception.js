const booking = require('./booking');
const sha256 = require('sha256');

//Signs the new user to the waiting list.
async function book(uuid) {
    const exists = await booking.exists({uuid: uuid});

    if (exists) {
        throw new Error('Duplicate UUID');
    }

    const perChannel = sha256(uuid);

    await booking.create({uuid, perChannel})

    return perChannel;
}

module.exports = {
    book
};


