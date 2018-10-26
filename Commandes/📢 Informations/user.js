var {
    RichEmbed
} = require('discord.js');

exports.run = async (client, message, args, utils, locale) => {
    let author = message.mentions.users.first() ? message.mentions.users.first() : message.author;
    let date = new Date(author.createdTimestamp);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month.toString().length < 2) month = `0${month}`;
    if (day.toString().length < 2) day = `0${day}`;
    let newDate = `${`${day}/${month}/${date.getFullYear()}`} à ${`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}`;
    let activity = author.presence.status.replace('online', '\\💤 Status : \`En ligne\` <:online:431524059268907010>').replace('idle', '\\💤 Status : \`Absent\` <:idle:431524059088420864>').replace('dnd', '\\💤 Status : \`Ne pas déranger\` <:dnd:431524058698612737>').replace('offline', '\\💤 Status : \`Hors ligne\` <:offline:431524059268775936>');
    let game = author.presence.game
    if (!game) game = 'Indéfini';
    else game = game.name;
    let lastmsg = author.lastMessage;
    if (!lastmsg) lastmsg = 'Indéfini';
    else lastmsg = lastmsg.content.replace(/\`/g, '\`');

    let embed = new RichEmbed()
    .setColor('#2277ff')
    .setThumbnail(author.iconURL)
    .addField(`Utilisateur`, `\\📰 Pseudo entier : \`${author.tag.replace(/\`/g, '\`')}\`\n\\🆔 ID : \`${author.id}\`\n\\📅 Création du compte : \`${newDate}\`\n\\👨 Pseudo : \`${author.username.replace(/\`/g, '\`')}\`\n\\👑 Discriminateur : \`#${author.discriminator}\`\n\\🤖 Bot ? : \`${author.bot.toString().replace('true', 'Oui').replace('false', 'Non')}\``)
    .addField(`Présence`, `${activity}\n\\🎮 Jeu : \`${game}\``)
    .addField(`Sur ce serveur`, `\\📛 Surnom : \`${message.guild.member(author.id).displayName}\`\n\\📩 Dernier message : \`${lastmsg.length > 0 ? lastmsg : 'Indéfini'}\`\n\\🎭 Roles : \`${message.guild.member(author.id).roles.size}\``)
    .addField(`Roles`, `${message.guild.member(author.id).roles.map(r => r)}`);

    message.channel.send(embed);
}

exports.config = {
    name: 'User',
    description: 'Voir les infos de soi ou d\'un utilisateur.',
    usage: 'user [@user]',
    category: 'Informations',
    cool: 20000,
    aliases: ['member', 'userinfo', 'uinfo', 'ui'],
    uPerms: [],
    bPerms: ['EMBED_LINKS', 'MANAGE_ROLES'],
    usable: true,
    enabled: true
};