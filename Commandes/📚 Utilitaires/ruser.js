exports.run = async function (client, message, args, utils, locale) {
    let users = [];
    message.guild.members.array().forEach(m => {
        return users.push(m.user.tag);
    });
    message.channel.send(`<:user:431920791043440651> ${locale.UTILITAIRES.RUSER} **${users[Math.floor(Math.random() * users.length)]}** !`)
}

exports.config = {
    name: 'RUser',
    description: 'Obtenir un utilisateur aléatoire',
    usage: 'ruser',
    category: 'Utilitaires',
    aliases: ['rmember'],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};