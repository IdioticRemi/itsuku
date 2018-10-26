var Discord = require('discord.js');
var moment = require('moment');
require('moment-duration-format');

exports.run = async function (client, message, args, utils, locale) {
    let t = message.mentions.users.first() ? message.mentions.users.first() : message.author;

    if (!client.userlist.get(t.id)) return message.channel.send(`Cette personne n'a pas encore de **profil** dans ma BDD !`);

    let user = await client.getProfile(t.id);

    if (!user.scores.filter(s => s.guild == message.guild.id)[0]) return message.channel.send(`Cette personne n'a pas encore d'**experience** !`);

    let exp = user.scores.filter(s => s.guild == message.guild.id)[0];
    let d = ``;

    if (user.daily && (user.daily + 86400000) - message.createdTimestamp >= 0) {
        let rest = moment.duration(((user.daily + 86400000) - message.createdTimestamp)).format(`H [h], m [min] [${locale.ROLEPLAY.GLOBAL.d}] s [sec]`);
        d = rest;
    } else d = locale.ROLEPLAY.GLOBAL.c;

    let embed = new Discord.RichEmbed()
        .setColor(`#2277ff`)
        .setAuthor(t.tag, t.avatarURL)
        .addField(`\\👨 ${locale.ROLEPLAY.PROFILE.a}`, `\\🔹 ${locale.ROLEPLAY.PROFILE.b} : \`${user.user}\` ${user.premium == true ? '<:premium:441642665671393280>' : ''} ${user.id == '350710888812249101' ? '<:check:441655574816620551>' : ''}\n\\🔹 ${locale.ROLEPLAY.PROFILE.c} : \`${user.id}\``)
        .addField(`\\📊 ${locale.ROLEPLAY.PROFILE.d}`, `\\🔹 ${locale.ROLEPLAY.PROFILE.e} : \`${exp.level}\`\n\\🔹 ${locale.ROLEPLAY.PROFILE.f} : \`${exp.exp}\``)
        .addField(`\\💴 ${locale.ROLEPLAY.PROFILE.g}`, `\\🔹 ${locale.ROLEPLAY.PROFILE.h} : \`${user.money} ¥\`\n\\🔹 ${locale.ROLEPLAY.PROFILE.i} : \`${d}\``)
        .setTimestamp();

    message.channel.send(embed);
}

exports.config = {
    name: 'Profile',
    description: 'Voir le profile de qqn (ou de soi) dans la base de données du bot',
    usage: 'profile [@user]',
    category: 'Roleplay',
    cool: 10000,
    aliases: ['prof', 'pf'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};