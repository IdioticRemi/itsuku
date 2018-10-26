var {
    RichEmbed
} = require('discord.js');

var arraySort = require('array-sort');

exports.run = async (client, message, args, utils, locale) => {
    let users = client.userlist.array();

    arraySort(users, 'money', {
        reverse: true
    });

    if (users.length > 20) {
        users = users.slice(0, 20);
    }

    let possibleUsers = '';
    let i = 1;
    users.forEach(u => {
        if (u.user.includes('ﾠ')) return;
        possibleUsers = possibleUsers + `\n**${i} 🔸 ${u.user}** *${u.money} ¥*`;
        i++;
    });

    let embed = new RichEmbed()
        .setColor('#2277ff')
        .setTitle(locale.ROLEPLAY.TOP.e)
        .setDescription(possibleUsers);

    message.channel.send(embed);
}

exports.config = {
    name: 'TopBal',
    description: 'Voir le classement de la monaie (tout les serveurs).',
    usage: 'topbal',
    category: 'Roleplay',
    cool: 30000,
    aliases: ['baltop', 'ballb', 'moneylb'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};