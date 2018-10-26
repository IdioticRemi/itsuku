var moment = require('moment');
moment.locale('fr');

exports.run = async function (client, message, args, utils, locale) {
    let user = await client.getProfile(message.author.id);

    if (user.daily && (user.daily + 86400000) - message.createdTimestamp >= 0) {
        let rest = moment.duration(((user.daily + 86400000) - message.createdTimestamp)).format(`H [h], m [min] [${locale.ROLEPLAY.GLOBAL.d}] s [sec]`);
        return message.channel.send(`\\❌ | ${locale.ROLEPLAY.DAILY.a} **${rest}** !`);
    }

    user.daily = message.createdTimestamp;
    user.money = user.money + 200;

    client.userlist.set(message.author.id, user);
    message.channel.send(`\\✅ | ${locale.ROLEPLAY.DAILY.b} **${user.money} ¥** !`);
}

exports.config = {
    name: 'Daily',
    description: 'Récupérer 200 ¥, une seule fois toutes les 24h',
    usage: 'daily',
    category: 'Roleplay',
    cool: 20000,
    aliases: ['day', 'job'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};