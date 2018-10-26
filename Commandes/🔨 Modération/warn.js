exports.run = async function (client, message, args, utils, locale) {
    let raison = args.splice(1).join(' ');
    let cible = message.mentions.users.first();
    let logchannel = message.guild.channels.get(client.settings.get(message.guild.id).modlogs);

    if (!logchannel) return utils.noLogs(message);
    if (message.mentions.users.size < 1 || raison.length < 1) return utils.noUserOrReason(message);
    if (message.guild.member(cible.id).hasPermission('ADMINISTRATOR')) return utils.cantWarn(message, cible);
    if (!logchannel.permissionsFor(client.user.id).has('SEND_MESSAGES') || !logchannel.permissionsFor(client.user.id).has('EMBED_LINKS')) return utils.cantSendLog(message, logchannel);

    await message.channel.send(`\\✅ | **${message.guild.member(cible.id).displayName + '#' + cible.discriminator}** a reçu un avertissement !`);
    await cible.send(`\\❗ | Vous avez été warn sur le serveur **${message.guild.name}** pour la raison : **${raison}**`).catch(e => e = '');
    await utils.log(client, cible, message, raison, 'Warn', logchannel);
}

exports.config = {
    name: 'Warn',
    description: 'Donner un avertissement à un utilisateur',
    usage: 'warn <@user> <raison>',
    category: 'Modération',
    cool: 2000,
    aliases: ['advert', 'avertir'],
    uPerms: ['MANAGE_MESSAGES'],
    bPerms: [],
    usable: true,
    enabled: true
};