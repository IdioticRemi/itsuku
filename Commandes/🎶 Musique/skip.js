exports.run = async function (client, message, args, utils, locale, queue) {
    let serverQueue = queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send(locale.MUSIQUE.GLOBAL.a);
    serverQueue.connection.dispatcher.end(`⏭ ${locale.MUSIQUE.SKIP} **${message.author.tag}** !`);
}

exports.config = {
    name: 'Skip',
    description: 'Sauter la musique en cours',
    usage: 'skip',
    category: 'Musique',
    cool: 5000,
    aliases: ['next'],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};