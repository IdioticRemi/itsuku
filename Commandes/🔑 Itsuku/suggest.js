var {
    RichEmbed
} = require('discord.js');

exports.run = async function (client, message, args, utils, locale) {
    if (!args[0]) return message.channel.send(`\\❌ | Veuillez entrer une **suggestion** !`);

    let embed = new RichEmbed()
        .setColor('#2277ff')
        .setDescription(`Suggestion de **${message.author.tag}**`)
        .addField(`Serveur`, message.guild.name, true)
        .addField(`Suggestion`, args.join(' ').replace(/\*/g, ''), true);
    client.channels.get('439492948435140618').send(embed);
    message.channel.send(`\\✅ | Votre suggestion a bien **été envoyée** !`).then(() => message.delete());
}

exports.config = {
    name: 'Suggest',
    description: 'Envoyer une suggestion pour le bot',
    usage: 'suggest <texte>',
    category: 'Itsuku',
    cool: 30000,
    aliases: ['suggestion', 'ajout'],
    uPerms: [],
    bPerms: ['MANAGE_MESSAGES'],
    usable: true,
    enabled: true
};