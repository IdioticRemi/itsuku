exports.run = async function (client, message, args, utils, locale) {
    let raison = args.splice(1).join(' ');
    let cible = message.mentions.users.first();
    let logchannel = message.guild.channels.get(client.settings.get(message.guild.id).modlogs);

    if (!logchannel) return utils.noLogs(message);
    if (message.mentions.users.size < 1 || raison.length < 1) return utils.noUserOrReason(message);
    if (client.settings.get(message.guild.id).mutes.includes(cible)) return utils.alreadyMuted(message, cible);
    if (message.guild.member(cible.id).hasPermission('ADMINISTRATOR')) return utils.cantMute(message, cible);
    if (!logchannel.permissionsFor(client.user.id).has('SEND_MESSAGES') || !logchannel.permissionsFor(client.user.id).has('EMBED_LINKS')) return utils.cantSendLog(message, logchannel);

    await message.channel.send(`\\✅ | **${message.guild.member(cible.id).displayName + '#' + cible.discriminator}** a été mute du serveur !`);
    await cible.send(`\\❗ | Vous avez été mute du serveur **${message.guild.name}** pour la raison : **${raison}**`).catch(e => e = '');
    await utils.log(client, cible, message, raison, 'Mute', logchannel);

    client.settings.get(message.guild.id).mutes.push(cible.id);
    client.settings.set(message.guild.id, client.settings.get(message.guild.id));
}

exports.config = {
    name: 'Mute',
    description: 'Mute un utilisateur du serveur',
    usage: 'mute <@user> <raison>',
    category: 'Modération',
    cool: 2000,
    aliases: ['shut', 'shutup'],
    uPerms: ['MANAGE_MESSAGES'],
    bPerms: ['MANAGE_MESSAGES'],
    usable: true,
    enabled: true
};