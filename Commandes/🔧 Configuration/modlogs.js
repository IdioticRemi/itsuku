exports.run = async (client, message, args, utils, locale) => {
    if (!args[0] || !isNaN(args[0]) || !['set', 'get', 'reset'].includes(args[0].toLowerCase())) return message.channel.send(`\\❌ | Veuillez entrer une sous-commande : **set | get | reset**.`);
    switch (args[0].toLowerCase()) {
        case 'get':
            let channelId = client.settings.get(message.guild.id).modlogs;
            if (!channelId) {
                return message.channel.send(`\\❌ | **Aucun channel défini**, veuillez en définir un pour le voir.`);
            }
            let channel = message.guild.channels.get(channelId);
            if (!channel) {
                return message.channel.send(`\\❌ | **Le channel défini n'existe plus**, veuillez redéfinir celui-ci.`);
            }
            message.channel.send(`\\✅ | Le channel des logs de modération est : **${channel}**`);
            break;
        case 'set':
            if (!args[1] || !message.mentions.channels.first()) return message.channel.send(`\\❌ | Veuillez entrer le channel désiré. Exemple: **i!modlogs set #mod-logs**`);
            try {
                let settings = client.settings.get(message.guild.id);
                settings.modlogs = message.mentions.channels.first().id;
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Le channel des logs de modération a bien été modifié : **${message.mentions.channels.first()}**`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
        case 'reset':
            try {
                let settings = client.settings.get(message.guild.id);
                settings.modlogs = undefined;
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Le channel des logs de modération a bien été réinitialisé !`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
    }
}

exports.config = {
    name: 'ModLogs',
    description: 'Voir, définir ou réinitialiser le channel des logs de modération.',
    usage: 'modlogs <set|get|reset> [args...]',
    category: 'Configuration',
    cool: 15000,
    aliases: ['modlog', 'logsmod', 'logmod'],
    uPerms: ['ADMINISTRATOR'],
    bPerms: [],
    usable: true,
    enabled: true
};