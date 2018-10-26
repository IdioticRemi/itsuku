exports.run = async (client, message, args, utils, locale) => {
    if (!args[0] || !isNaN(args[0]) || !['set', 'get', 'reset'].includes(args[0].toLowerCase())) return message.channel.send(`\\❌ | Veuillez entrer une sous-commande : **set | get | reset**.`);
    switch (args[0].toLowerCase()) {
        case 'get':
            message.channel.send(`\\✅ | Ma langue actuelle est : **${client.settings.get(message.guild.id).locale}**`);
            break;
        case 'set':
            if (!args[1] || !client.locales.keyArray().includes(args[1].toLowerCase())) return message.channel.send(`\\❌ | Veuillez entrer une langue valide : **${client.locales.keyArray().join(', ')}**. Exemple: **i!lang set fr**`);
            try {
                let settings = client.settings.get(message.guild.id);
                settings.locale = args[1];
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Ma langue a bien été modifiée : **${settings.locale}**`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
        case 'reset':
            try {
                let settings = client.settings.get(message.guild.id);
                settings.locale = 'i!';
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Mon préfixe local a bien été réinitialisé !`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
    }
}

exports.config = {
    name: 'lang',
    description: 'Voir, définir ou réinitialiser la langue du bot.',
    usage: 'lang <set|get|reset> [args...]',
    category: 'Configuration',
    cool: 15000,
    aliases: ['locale', 'language'],
    uPerms: ['ADMINISTRATOR'],
    bPerms: [],
    usable: true,
    enabled: true
};