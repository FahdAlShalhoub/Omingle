const match = require('./match');
const sha256 = require('sha256');

//Takes the array created by makePairs and formats them into matches and saving them
async function saveMatches(matches) {
    return await match.insertMany(matches.map(matchi => {
        return new match({
            uuid1: matchi.elm1.uuid,
            uuid2: matchi.elm2.uuid,
            perChannel1: matchi.elm1.perChannel,
            perChannel2: matchi.elm2.perChannel,
            chatChannel: sha256(matchi.elm1.uuid + matchi.elm2.uuid)
        });
    }));
}

//Creates an array of pairs containing bookings randomly
function makePairs(bookings) {
    let pairs = [];
    let numOfIterations = bookings.length / 2;
    for (let i = 0; i < numOfIterations; i++) {
        let elm1 = bookings.splice(Math.floor(Math.random() * bookings.length), 1)[0];
        let elm2 = bookings.splice(Math.floor(Math.random() * bookings.length), 1)[0];
        pairs.push({elm1, elm2});
    }
    return pairs;
}

async function launch(bookings) {
    return await saveMatches(makePairs(bookings))
}

module.exports = {
    makePairs,
    saveMatches,
    launch
}

