exports.run = async function (client, message, args, utils, locale, queue) {
    let serverQueue = queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send(locale.MUSIQUE.GLOBAL.a);

    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    setTimeout(() => {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        message.channel.send(`⏯ ${locale.MUSIQUE.REFRESH} **${message.author.tag}**`);
    }, 2000)
}

exports.config = {
    name: 'Refresh',
    description: 'Si la musique s\'arrête toute seule, faites cette commande !',
    usage: 'refresh',
    category: 'Musique',
    cool: 10000,
    aliases: [],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};