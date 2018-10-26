var Discord = require('discord.js');

exports.run = async (client, message, args, utils, locale) => {
    let image = message.mentions.users.first() ? message.mentions.users.first() : message.author;

    let embed = new Discord.RichEmbed()
    .setColor('#2277ff')
    .setTitle(`\\📸    Négatif : ${image.tag}`)
    .setImage(`https://cute-api.tk/v1/generate/invert?url=${image.avatarURL}`);

    message.channel.send(embed)
}

exports.config = {
    name: 'Negative',
    description: 'Faire la photo de prfile de qqn en négatif',
    usage: 'negative [@user]',
    category: 'Images',
    cool: 15000,
    aliases: ['nega', 'negatif', 'n', 'invert'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};