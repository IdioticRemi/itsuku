exports.run = async function (client, message, args, utils, locale) {
    let rMember = message.guild.member(message.mentions.users.first());
    let role = message.mentions.roles.first();

    if (!rMember || !role) return utils.noUserOrRole(message);
    if (!rMember.roles.has(role.id)) return message.channel.send(`\\❌ | Cette personne n'a déjà le role **${role.name}** !`);

    let ret = false
    await rMember.removeRole(role.id).catch(e => {
        ret = true;
        return message.channel.send(`\\❌ | Je ne peut pas retirer ce rôle à **${rMember.displayName + '#' + rMember.user.discriminator}** !`);
    });
    if (ret == true) return;

    message.channel.send(`\\✅ | Le rôle **${role.name}** a été retiré à **${rMember.displayName + '#' + rMember.user.discriminator}** !`)
}

exports.config = {
    name: 'Remrole',
    description: 'Retirer un role à un utilisateur',
    usage: 'remrole',
    category: 'Modération',
    cool: 2000,
    aliases: ['rolerem', 'role-', 'removerole'],
    uPerms: ['MANAGE_ROLES'],
    bPerms: ['ADMINISTRATOR'],
    usable: true,
    enabled: true
};