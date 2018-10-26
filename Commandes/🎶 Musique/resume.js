exports.run = async function (client, message, args, utils, locale, queue) {
    let serverQueue = queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send(locale.MUSIQUE.GLOBAL.a);
    if (serverQueue.playing == true) return message.channel.send(`\\❌ | ${locale.MUSIQUE.RESUME.a}`);

    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();

    message.channel.send(`▶ ${locale.MUSIQUE.RESUME.b} **${message.author.tag}** !`);
}

exports.config = {
    name: 'Resume',
    description: 'Remettre la musique la musique actuelle en marche',
    usage: 'resume',
    category: 'Musique',
    cool: 5000,
    aliases: [],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};