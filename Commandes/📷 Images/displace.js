var Discord = require('discord.js');

exports.run = async (client, message, args, utils, locale) => {
    let image = message.mentions.users.first() ? message.mentions.users.first() : message.author;

    let embed = new Discord.RichEmbed()
    .setColor('#2277ff')
    .setTitle(`\\📸    Displace : ${image.tag}`)
    .setImage(`https://cute-api.tk/v1/generate/displace?url=${image.avatarURL}`);

    message.channel.send(embed)
}

exports.config = {
    name: 'Displace',
    description: 'Faire la photo de profil de qqn en décalé par endroits',
    usage: 'displace [@user]',
    category: 'Images',
    cool: 15000,
    aliases: ['decale', 'displaced'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};