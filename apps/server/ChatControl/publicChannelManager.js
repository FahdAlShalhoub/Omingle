const match = require('../Matchmaker/match');

//Sends the chat channels to their respective users through their private channels
async function distributeChannels(namespace) {
    let available = await match.exists({});
    if (!available) {
        return 'No public channels to distribute';
    }

    const matches = await match.find();

    await Promise.all(matches.map(match1 => {
        namespace.to(match1.perChannel1).emit('matchFound', match1.chatChannel);
        namespace.to(match1.perChannel2).emit('matchFound', match1.chatChannel);
        return match.deleteOne({chatChannel: match1.chatChannel});
    }));

    return `Connected ${matches.length} Chat Channels`;
}

module.exports = {
    distributeChannels,
}
