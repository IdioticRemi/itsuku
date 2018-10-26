var {
    RichEmbed
} = require('discord.js');

exports.run = async function (client, message, args, utils, locale) {
    if (!args[0] || !message.mentions.users.first() || message.mentions.users.first().id == message.author.id || !args[1] || isNaN(args[1])) return message.channel.send(`\\❌ | ${locale.ROLEPLAY.PAY.a}`);

    let target = message.mentions.users.first();
    
    if (!client.userlist.get(target.id)) client.initUser(target);

    let uAcc = await client.getProfile(message.author.id);
    let tAcc = await client.getProfile(target.id);
    let toSend = Math.floor(args[1]);

    if (uAcc.money < toSend) return message.channel.send(`\\❌ | ${locale.ROLEPLAY.PAY.b} **${toSend - uAcc.money} ¥** ${locale.ROLEPLAY.PAY.c}) !`);

    uAcc.money = uAcc.money - toSend;
    tAcc.money = tAcc.money + toSend;

    client.userlist.set(message.author.id, uAcc);
    client.userlist.set(target.id, tAcc);

message.channel.send(`\\✅ | ${locale.ROLEPLAY.PAY.d} **${toSend} ¥** ${locale.ROLEPLAY.PAY.e} **${target.tag.replace(/\*/g, '\*')}** ! ${locale.ROLEPLAY.PAY.f} **${uAcc.money} ¥** ...`);
}

exports.config = {
    name: 'Pay',
    description: 'Envoyer de l\'argent à qqn d\'autre',
    usage: 'pay <@user> <somme>',
    category: 'Roleplay',
    cool: 20000,
    aliases: ['send', 'transfer'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};