exports.run = async function (client, message, args, utils, locale) {
    let rMember = message.guild.member(message.mentions.users.first());
    let role = message.mentions.roles.first();

    if (!rMember || !role) return utils.noUserOrRole(message);
    if (rMember.roles.has(role.id)) return message.channel.send(`\\❌ | Cette personne a déjà le role **${role.name}** !`);

    let ret = false
    await rMember.addRole(role.id).catch(e => {
        ret = true;
        return message.channel.send(`\\❌ | Je ne peut pas ajouter ce rôle à **${rMember.displayName + '#' + rMember.user.discriminator}** !`);
    });
    if (ret == true) return;

    message.channel.send(`\\✅ | Le rôle **${role.name}** a été ajouté à **${rMember.displayName + '#' + rMember.user.discriminator}** !`)
}

exports.config = {
    name: 'Addrole',
    description: 'Ajouter un role à un utilisateur',
    usage: 'addrole',
    category: 'Modération',
    cool: 2000,
    aliases: ['roleadd', 'role+'],
    uPerms: ['MANAGE_ROLES'],
    bPerms: ['ADMINISTRATOR'],
    usable: true,
    enabled: true
};