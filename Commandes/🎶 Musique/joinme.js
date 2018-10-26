exports.run = async function (client, message, args, utils, locale, queue) {
    let serverQueue = queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send(locale.MUSIQUE.GLOBAL.a);

    let voiceChannel = message.member.voiceChannel;

    if (!voiceChannel) return message.channel.send(`\\❌ | ${locale.MUSIQUE.JOINME.a}`);

    let permissions = voiceChannel.permissionsFor(client.user);

    if (!permissions.has('CONNECT')) return message.channel.send(`\\❌ | ${locale.MUSIQUE.JOINME.b}`);
    if (!permissions.has('SPEAK')) return message.channel.send(`\\❌ | ${locale.MUSIQUE.JOINME.c}`);

    await voiceChannel.join().then(() => {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        setTimeout(() => {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
        }, 2000)
    });
}

exports.config = {
    name: 'JoinMe',
    description: 'Je rejoins votre channel vocal',
    usage: 'joinme',
    category: 'Musique',
    cool: 10000,
    aliases: [],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};