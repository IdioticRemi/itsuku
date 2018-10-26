exports.run = async (client, message, args, utils, locale) => {
    let m = await message.channel.send("Chargement ...");
    m.edit(`:ping_pong: **Pong !** Latence instantanée : **${m.createdTimestamp - message.createdTimestamp}ms**.`);
}

exports.config = {
    name: 'Ping',
    description: 'Voir la latence du bot.',
    usage: 'ping',
    category: 'Itsuku',
    cool: 15000,
    aliases: ['pong', 'latence', 'ms'],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};