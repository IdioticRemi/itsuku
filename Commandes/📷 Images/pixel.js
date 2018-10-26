var Discord = require('discord.js');

exports.run = async (client, message, args, utils, locale) => {
    let image = message.mentions.users.first() ? message.mentions.users.first() : message.author;

    let embed = new Discord.RichEmbed()
    .setColor('#2277ff')
    .setTitle(`\\📸    Pixel : ${image.tag}`)
    .setImage(`https://cute-api.tk/v1/generate/pixelate?url=${image.avatarURL}`);

    message.channel.send(embed)
}

exports.config = {
    name: 'Pixel',
    description: 'Faire la photo de profil de qqn en pixélisé',
    usage: 'pixel [@user]',
    category: 'Images',
    cool: 15000,
    aliases: ['pixelate', 'pixelise', 'pixl'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};