var {
    RichEmbed
} = require('discord.js');

var arraySort = require('array-sort');

exports.run = async (client, message, args, utils, locale) => {
    if (client.settings.get(message.guild.id).exp == false) return message.channel.send(locale.ROLEPLAY.GLOBAL.e);

    let exps = []
    client.userlist.forEach(u => {
        if (u.scores.filter(s => s.guild == message.guild.id).length != 0) exps.push(u.scores.filter(s => s.guild == message.guild.id)[0]);
    });

    if (exps.length < 1) {
        return message.channel.send(`\\❌ | ${locale.ROLEPLAY.TOP.a}`);
    }

    arraySort(exps, 'exp', {
        reverse: true
    });

    if (exps.length > 20) {
        exps = exps.slice(0, 20);
    }

    let possibleExps = '';
    let i = 1;
    exps.forEach(exp => {
        possibleExps = possibleExps + `\n**${i} 🔸 ${message.guild.member(exp.id).displayName}** *${locale.ROLEPLAY.TOP.b} ${exp.level} - ${exp.exp} ${locale.ROLEPLAY.TOP.c}*`
        i++;
    });

    let embed = new RichEmbed()
        .setColor('#2277ff')
        .setTitle(locale.ROLEPLAY.TOP.d)
        .setDescription(possibleExps);

    message.channel.send(embed);
}

exports.config = {
    name: 'TopExp',
    description: 'Voir le classement de l\'experience sur le serveur.',
    usage: 'topexp',
    category: 'Roleplay',
    cool: 30000,
    aliases: ['exptop', 'explb', 'lbexp'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};