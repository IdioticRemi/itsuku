var Discord = require('discord.js');

exports.run = async (client, message, args, utils, locale) => {
    let image = message.mentions.users.first() ? message.mentions.users.first() : message.author;

    let embed = new Discord.RichEmbed()
    .setColor('#2277ff')
    .setTitle(`\\📸    Blur : ${image.tag}`)
    .setImage(`https://cute-api.tk/v1/generate/blur?url=${image.avatarURL}`);

    message.channel.send(embed)
}

exports.config = {
    name: 'Blur',
    description: 'Faire la photo de profil de qqn en flou',
    usage: 'blur [@user]',
    category: 'Images',
    cool: 15000,
    aliases: ['flou', 'fondu'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};