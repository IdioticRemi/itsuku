exports.run = async function (client, message, args, utils, locale) {
    let raison = args.splice(1).join(' ');
    let cible = message.mentions.users.first();
    let logchannel = message.guild.channels.get(client.settings.get(message.guild.id).modlogs);

    if (!logchannel) return utils.noLogs(message);
    if (message.mentions.users.size < 1 || raison.length < 1) return utils.noUserOrReason(message);
    if (message.guild.member(cible.id).hasPermission('ADMINISTRATOR')) return utils.cantBan(message, cible);
    if (!message.guild.member(cible.id).bannable) return utils.cantBan2(message, cible);
    if (!logchannel.permissionsFor(client.user.id).has('SEND_MESSAGES') || !logchannel.permissionsFor(client.user.id).has('EMBED_LINKS')) return utils.cantSendLog(message, logchannel);

    await message.channel.send(`\\✅ | **${message.guild.member(cible.id).displayName + '#' + cible.discriminator}** a été banni du serveur !`);
    await cible.send(`\\❗ | Vous avez été banni du serveur **${message.guild.name}** pour la raison : **${raison}**`).catch(e => e = '');
    await utils.log(client, cible, message, raison, 'Ban', logchannel);

    message.guild.member(cible.id).ban({
        reason: raison
    });
}

exports.config = {
    name: 'Ban',
    description: 'Expulser qqn du serveur',
    usage: 'ban <@user> <raison>',
    category: 'Modération',
    cool: 2000,
    aliases: ['permban'],
    uPerms: ['BAN_MEMBERS'],
    bPerms: ['BAN_MEMBERS', 'EMBED_LINKS'],
    usable: true,
    enabled: true
};