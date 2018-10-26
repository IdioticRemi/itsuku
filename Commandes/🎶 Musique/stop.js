exports.run = async function (client, message, args, utils, locale, queue) {
    let serverQueue = queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send(locale.MUSIQUE.GLOBAL.a);

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end(`⏹ ${locale.MUSIQUE.STOP} **${message.author.tag}** !`);
}

exports.config = {
    name: 'Stop',
    description: 'Arrêter la musique en cours',
    usage: 'stop',
    category: 'Musique',
    cool: 5000,
    aliases: ['end'],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};