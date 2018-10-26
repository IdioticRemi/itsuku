var { RichEmbed } = require('discord.js');
var news = require('../../news.json');

exports.run = async function (client, message, args, utils, locale) {
    if (!args[0]) {
        let last = news.vers.filter(v => v.title == news.last)[0];
        let embed = new RichEmbed()
        .setColor('#2277ff')
        .setThumbnail(client.user.avatarURL)
        .setDescription(`**News : v${last.title}**\n\n${last.added.join('\n')}\n\nDate : **${last.date}**`);

        message.channel.send(embed);
    } else {
        if (!news.vers.map(v => v.title).includes(args[0])) return message.channel.send(`Voici la liste des versions : \n**- ${news.vers.map(v => v.title).join('**\n- **')}**`);

        let last = news.vers.filter(v => v.title == args[0])[0]
        let embed = new RichEmbed()
        .setColor('#2277ff')
        .setThumbnail(client.user.avatarURL)
        .setDescription(`**News : v${last.title}**\n\n${last.added.join('\n')}\n\nDate : **${last.date}**`);

        message.channel.send(embed);
    }
}

exports.config = {
    name: 'News',
    description: 'Voir les nouveautés du bot',
    usage: 'news',
    category: 'Informations',
    cool: 10000,
    aliases: ['devlog', 'devlogs'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};