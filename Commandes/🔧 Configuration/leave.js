exports.run = async (client, message, args, utils, locale) => {
    if (!args[0] || !isNaN(args[0]) || !['set', 'get', 'reset'].includes(args[0].toLowerCase())) return message.channel.send(`\\❌ | Veuillez entrer une sous-commande : **set | get | reset**.`);
    switch (args[0].toLowerCase()) {
        case 'get':
            let leave = client.settings.get(message.guild.id).leave;
            if (!leave) {
                return message.channel.send(`\\❌ | **Aucun message défini**, veuillez en définir un pour le voir.`);
            }
            message.channel.send(`\\✅ | Le message de goodbye est : ${leave}`);
            break;
        case 'set':
            if (!args[1]) return message.channel.send(`\\❌ | Veuillez entrer le message désiré. Exemple: **i!leave set Au revoir |@USER| ! Reviens sur |GUILD| un jour, on est maintenant |COUNT|...**`);
            try {
                args.shift();
                let settings = client.settings.get(message.guild.id);
                settings.leave = args.join(' ');
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Le message de goodbye a bien été modifié : **${args.join(' ').replace(/\*/g, '\\*')}**`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
        case 'reset':
            try {
                let settings = client.settings.get(message.guild.id);
                settings.leave = undefined;
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Le message de goodbye a bien été réinitialisé !`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
    }
}

exports.config = {
    name: 'Leave',
    description: 'Voir, définir ou réinitialiser le message de goodbye.',
    usage: 'leave <set|get|reset> [args...]',
    category: 'Configuration',
    cool: 15000,
    aliases: [],
    uPerms: ['ADMINISTRATOR'],
    bPerms: [],
    usable: true,
    enabled: true
};