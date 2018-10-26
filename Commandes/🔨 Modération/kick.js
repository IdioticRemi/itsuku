exports.run = async function (client, message, args, utils, locale) {
    let raison = args.splice(1).join(' ');
    let cible = message.mentions.users.first();
    let logchannel = message.guild.channels.get(client.settings.get(message.guild.id).modlogs);

    if (!logchannel) return utils.noLogs(message);
    if (message.mentions.users.size < 1 || raison.length < 1) return utils.noUserOrReason(message);
    if (message.guild.member(cible.id).hasPermission('ADMINISTRATOR')) return utils.cantKick(message, cible);
    if (!message.guild.member(cible.id).kickable) return utils.cantKick2(message, cible);
    if (!logchannel.permissionsFor(client.user.id).has('SEND_MESSAGES') || !logchannel.permissionsFor(client.user.id).has('EMBED_LINKS')) return utils.cantSendLog(message, logchannel);

    await message.channel.send(`\\✅ | **${message.guild.member(cible.id).displayName + '#' + cible.discriminator}** a été kick du serveur !`);
    await cible.send(`\\❗ | Vous avez été expulsé du serveur **${message.guild.name}** pour la raison : **${raison}**`).catch(e => e = '');
    await utils.log(client, cible, message, raison, 'Kick', logchannel);

    message.guild.member(cible.id).kick({
        reason: raison
    });
}

exports.config = {
    name: 'Kick',
    description: 'Expulser qqn du serveur',
    usage: 'kick <@user> <raison>',
    category: 'Modération',
    cool: 2000,
    aliases: ['expulse'],
    uPerms: ['KICK_MEMBERS'],
    bPerms: ['KICK_MEMBERS', 'EMBED_LINKS'],
    usable: true,
    enabled: true
};