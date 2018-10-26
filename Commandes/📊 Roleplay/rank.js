var {
    RichEmbed
} = require('discord.js');

exports.run = async function (client, message, args, utils, locale) {
    if (client.settings.get(message.guild.id).exp == false) return message.channel.send(locale.ROLEPLAY.GLOBAL.e);

    let user = message.mentions.users.first() ? message.mentions.users.first() : message.author;
    
    if (!client.userlist.get(user.id)) client.initUser(user);

    let u = await client.getProfile(user.id);

    if (u.scores.filter(s => s.guild == message.guild.id).length < 1 && message.mentions.users.first()) return message.channel.send(`\\❌ | ${locale.ROLEPLAY.RANK.a}`);
    else if (u.scores.filter(s => s.guild == message.guild.id).length < 1 && user.id == message.author.id) return message.channel.send(`\\❌ | ${locale.ROLEPLAY.RANK.b}`);

    let exp = u.scores.filter(e => e.guild == message.guild.id)[0];

    let userList = [];

    client.userlist.forEach(usr => {
        if (usr.scores.filter(f => f.guild == message.guild.id && f.id != user.id).length > 0) return userList.push(usr.scores.filter(f => f.guild == message.guild.id)[0]);
    })

    let rank = 1;

    userList.forEach(e => {
        if (e.exp >= exp.exp) return rank++;
    })

    let lastExp = exp.level != 0 ? (exp.level ** 2 * 35) : 0;
    let reqExp = ((exp.level + 1) ** 2 * 35);

    let embed = new RichEmbed()
        .setColor('#2277ff')
        .setAuthor(user.tag, user.avatarURL)
        .addField(locale.ROLEPLAY.RANK.c, `${rank}/${userList.length + 1}`, true)
        .addField(locale.ROLEPLAY.RANK.d, exp.level, true)
        .addField(locale.ROLEPLAY.RANK.e, `${exp.exp - lastExp}/${reqExp - lastExp} (${locale.ROLEPLAY.RANK.f} ${exp.exp})`, true)
        .addField('Booster', u.premium ? '150 %' : '100 %');

    message.channel.send(embed);
}

exports.config = {
    name: 'Rank',
    description: 'Voir son argent ou celui de qqn d\'autre',
    usage: 'rank [@user]',
    category: 'Roleplay',
    cool: 10000,
    aliases: ['exp', 'lvl', 'level'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};