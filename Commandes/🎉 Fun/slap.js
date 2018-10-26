var {
    RichEmbed
} = require('discord.js');
var Cute = require('cuteapi');

exports.run = async function (client, message, args, utils, locale) {
    if (message.mentions.users.size < 1 || message.mentions.users.first().id == message.author.id) return message.channel.send(locale.FUN.GLOBAL.a);
    var API = new Cute(client.config.CUTE_API_KEY);

    API.getJSON('slap').then(pic => {
        let embed = new RichEmbed()
            .setColor('#2277ff')
            .setDescription(`**${message.guild.member(message.author.id).displayName}** ${locale.FUN.SLAP} **${message.guild.member(message.mentions.users.first().id).displayName}** !`)
            .setImage(pic.url);
        message.channel.send(embed);
    });
}

exports.config = {
    name: 'Slap',
    description: 'Mettre une giffle à une autre personne du serveur',
    usage: 'slap <@user>',
    category: 'Fun',
    cool: 20000,
    aliases: ['baffe', 'claque'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};