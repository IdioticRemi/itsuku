exports.run = async (client, message, args, utils, locale) => {
    if (!args[0] || !isNaN(args[0]) || !['set', 'get', 'reset'].includes(args[0].toLowerCase())) return message.channel.send(`\\❌ | Veuillez entrer une sous-commande : **set | get | reset**.`);
    switch (args[0].toLowerCase()) {
        case 'get':
            message.channel.send(`\\✅ | Mon préfixe local est : **${client.settings.get(message.guild.id).prefix}**`);
            break;
        case 'set':
            if (!args[1]) return message.channel.send(`\\❌ | Veuillez entrer le préfixe désiré. Exemple: **i!prefix set i.**`);
            try {
                let settings = client.settings.get(message.guild.id);
                settings.prefix = args[1];
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Mon préfixe local a bien été modifié : **${settings.prefix}**`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
        case 'reset':
            try {
                let settings = client.settings.get(message.guild.id);
                settings.prefix = 'i!';
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Mon préfixe local a bien été réinitialisé !`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
    }
}

exports.config = {
    name: 'Prefix',
    description: 'Voir, définir ou réinitialiser le préfixe local.',
    usage: 'prefix <set|get|reset> [args...]',
    category: 'Configuration',
    cool: 15000,
    aliases: [],
    uPerms: ['ADMINISTRATOR'],
    bPerms: [],
    usable: true,
    enabled: true
};