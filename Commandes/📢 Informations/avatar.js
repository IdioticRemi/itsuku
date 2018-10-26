var {
    RichEmbed
} = require('discord.js');

exports.run = async (client, message, args, utils, locale) => {
    let user = message.mentions.users.first() ? message.mentions.users.first() : message.author;

    let embed = new RichEmbed()
        .setColor('#2277ff')
        .setTitle(`\\📸    \`${user.username}\``)
        .setImage(user.avatarURL)

    message.channel.send(embed);
}

exports.config = {
    name: 'Avatar',
    description: 'Voir la photo de profil de quelqu\'un',
    usage: 'avatar [@user]',
    category: 'Informations',
    cool: 10000,
    aliases: ['p2p', 'pdp', 'pic', 'picture'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};