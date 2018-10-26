exports.run = async function (client, message, args, utils, locale, queue) {
    let serverQueue = queue.get(message.guild.id);

    if (!serverQueue && !args[0]) return message.channel.send(locale.MUSIQUE.GLOBAL.a);
    else if (!serverQueue) return message.channel.send(locale.MUSIQUE.GLOBAL.a);
    
    if (!args[0]) return message.channel.send(`🔊 ${locale.MUSIQUE.VOLUME.a} **${serverQueue.volume} %**`);
    if (isNaN(args[0]) || parseInt(args[0]) < 2 || parseInt(args[0]) > 200) return message.channel.send(`\\❌ | ${locale.MUSIQUE.VOLUME.b}`);
    
    serverQueue.connection.dispatcher.setVolumeLogarithmic(parseInt(args[0]) / 2 / 100);
    serverQueue.volume = parseInt(args[0]);

    message.channel.send(`🔊 ${locale.MUSIQUE.VOLUME.c} **${args[0]} %** ${locale.MUSIQUE.VOLUME.d} **${message.author.tag}** !`);
}

exports.config = {
    name: 'Volume',
    description: 'Voir ou Définir le volume de la musique en cours',
    usage: 'volume [2 à 200]',
    category: 'Musique',
    cool: 5000,
    aliases: ['vol'],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};