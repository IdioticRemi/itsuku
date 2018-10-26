var {
    RichEmbed
} = require('discord.js');
var moment = require('moment');
moment.locale('fr');

exports.run = async function (client, message, args, utils, locale) {
    let user = message.mentions.users.first() ? message.mentions.users.first() : message.author;

    if (!client.userlist.get(user.id)) client.initUser(user);

    let u = await client.getProfile(user.id);

    let embed = new RichEmbed()
        .setColor('#2277ff')
        .setAuthor(user.tag, user.avatarURL)
        .addField(locale.ROLEPLAY.GLOBAL.a, u.money + ' ¥', true);


    if (u.daily && (u.daily + 86400000) - message.createdTimestamp >= 0) {
        let rest = moment.duration(((u.daily + 86400000) - message.createdTimestamp)).format(`H [h], m [min] [${locale.ROLEPLAY.GLOBAL.d}] s [sec]`);
        embed.addField('Daily', `${locale.ROLEPLAY.GLOBAL.b} ` + rest, true);
    } else embed.addField('Daily', locale.ROLEPLAY.GLOBAL.c, true);

    message.channel.send(embed);
}

exports.config = {
    name: 'Balance',
    description: 'Voir son argent ou celui de qqn d\'autre',
    usage: 'balance [@user]',
    category: 'Roleplay',
    cool: 10000,
    aliases: ['bal', 'eco', 'money'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};