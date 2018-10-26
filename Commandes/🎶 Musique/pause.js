exports.run = async function (client, message, args, utils, locale, queue) {
    let serverQueue = queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send(locale.MUSIQUE.GLOBAL.a);
    if (serverQueue.playing == false) return message.channel.send(`\\❌ | ${locale.MUSIQUE.PAUSE.a}`);

    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();

    message.channel.send(`⏸ ${locale.MUSIQUE.PAUSE.b} **${message.author.tag}** !`);
}

exports.config = {
    name: 'Pause',
    description: 'Mettre en pause la musique actuelle',
    usage: 'pause',
    category: 'Musique',
    cool: 5000,
    aliases: [],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};