exports.run = async function (client, message, args, utils, locale, queue) {
    let serverQueue = queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send(locale.MUSIQUE.GLOBAL.a);

    message.channel.send(`⏯ ${locale.MUSIQUE.PLAYING} **${serverQueue.songs[0].title.replace(/\*/g, '\\*')}**`);
}

exports.config = {
    name: 'Playing',
    description: 'Voir le nom de la musique en cours',
    usage: 'playing',
    category: 'Musique',
    cool: 5000,
    aliases: ['now', 'np', 'nowplaying', 'music'],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};