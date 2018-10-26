var {
    RichEmbed
} = require('discord.js');

exports.run = async function (client, message, args, utils, locale) {
    if (!args[0] || isNaN(args[0]) || args[0] > 5.0 || args[0] < 0.1 || !args[1]) return message.channel.send(`\\❌ | Veuillez entrer un **nombre d'étoiles** (entre 0.1 et 5.0) et un **avis** !`);

    let embed = new RichEmbed()
        .setColor('#2277ff')
        .setDescription(`Avis de **${message.author.tag}** sur **${message.guild.name}**`)
        .addField(`Étoiles`, `${parseFloat(args.shift()).toFixed(1)} \\⭐`, true)
        .addField(`Avis`, args.join(' '), true);
    client.channels.get('439492915174309908').send(embed);
    message.channel.send(`\\✅ | Votre avis a bien **été envoyé** !`);
}

exports.config = {
    name: 'Feedback',
    description: 'Envoyer son avis sur le bot',
    usage: 'feedback <0.1-5.0> <avis>',
    category: 'Itsuku',
    cool: 60000,
    aliases: ['fb', 'back', 'rate', 'avis'],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};