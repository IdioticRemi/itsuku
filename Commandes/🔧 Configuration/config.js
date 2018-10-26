var {
    RichEmbed
} = require('discord.js');

exports.run = async function (client, message, args, utils, locale) {
    let s = client.settings.get(message.guild.id);

    let embed = new RichEmbed()
        .setColor('#2277ff')
        .setAuthor('Configuration : ' + message.guild.name, 'https://cdn2.iconfinder.com/data/icons/ballicons-2-free/100/wrench-512.png')
        .addField(`Préfixes`, `\\📢 Global : \`i!\`\n\\🔧 Customisé : \`${s.prefix}\``, true)
        .addField(`Systèmes`, `\\📊 Experience : \`${s.exp.toString().replace('true', 'Activé').replace('false', 'Désactivé')}\`\n\\🔗 Anti-Liens : \`${s.antilink.toString().replace('true', 'Activé').replace('false', 'Désactivé')}\``, true)
        .addField(`Message de LevelUP`, s.levelup ? s.levelup : 'Indéfini', false)
        .addField(`Channel de bienvenue`, s.welcome ? (message.guild.channels.get(s.welcome) ? message.guild.channels.get(s.welcome) : 'Indéfini') : 'Indéfini', true)
        .addField(`Channel des logs`, s.modlogs ? (message.guild.channels.get(s.modlogs) ? message.guild.channels.get(s.modlogs) : 'Indéfini') : 'Indéfini', true)
        .addField(`Auto-rôle`, s.autorole ? (message.guild.roles.get(s.autorole) ? message.guild.roles.get(s.autorole) : 'Indéfini') : 'Indéfini', true)
        .addField(`Message de Join`, s.join ? s.join : 'Indéfini', false)
        .addField(`Message de Leave`, s.leave ? s.leave : 'Indéfini', false);

    message.channel.send(embed);
}

exports.config = {
    name: 'Config',
    description: 'Voir la configuration du serveur',
    usage: 'config',
    category: 'Configuration',
    cool: 20000,
    aliases: ['cfg', 'configuration', 'conf'],
    uPerms: ['ADMINISTRATOR'],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};