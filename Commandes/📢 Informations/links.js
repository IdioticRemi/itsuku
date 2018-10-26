var {
    RichEmbed
} = require('discord.js');

exports.run = async function (client, message, args, utils, locale) {
    let embed = new RichEmbed()
        .setColor('#2277ff')
        .setAuthor(client.user.tag, client.user.avatarURL)
        .setDescription(`Lien d'invitation : [Cliquez ici](https://discordapp.com/oauth2/authorize/?permissions=8&scope=bot&client_id=438004751402139668)\nServeur Discord : [Cliquez ici](https://discord.gg/MAHB2C9)\n\nDiscord Bot List : [Cliquez ici](https://discordbots.org/bot/438004751402139668)`);
    message.channel.send(embed);
}

exports.config = {
    name: 'Links',
    description: 'Voir les liens importants me concerenant !',
    usage: 'links',
    category: 'Informations',
    cool: 10000,
    aliases: ['liens', 'lien', 'invite', 'link'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};