var {
    RichEmbed
} = require('discord.js');
var Cute = require('cuteapi');

exports.run = async function (client, message, args, utils, locale) {
    if (message.mentions.users.size < 1 || message.mentions.users.first().id == message.author.id) return message.channel.send(locale.FUN.GLOBAL.a);
    var API = new Cute(client.config.CUTE_API_KEY);

    API.getJSON('highfive').then(pic => {
        let embed = new RichEmbed()
            .setColor('#2277ff')
            .setDescription(`**${message.guild.member(message.author.id).displayName}** ${locale.FUN.HIGHFIVE} **${message.guild.member(message.mentions.users.first().id).displayName}** !`)
            .setImage(pic.url);
        message.channel.send(embed);
    });
}

exports.config = {
    name: 'Highfive',
    description: 'Faire un highfive avec une autre personne du serveur',
    usage: 'highfive <@user>',
    category: 'Fun',
    cool: 20000,
    aliases: ['hf', 'handclap'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};