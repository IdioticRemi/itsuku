exports.run = async (client, message, args, utils, locale) => {
    if (!args[0] || !isNaN(args[0]) || !['set', 'get', 'reset', 'default'].includes(args[0].toLowerCase())) return message.channel.send(`\\❌ | Veuillez entrer une sous-commande : **set | get | reset | default**.`);
    switch (args[0].toLowerCase()) {
        case 'get':
            let levelup = client.settings.get(message.guild.id).levelup;
            if (!levelup) {
                return message.channel.send(`\\❌ | **Aucun message défini**, veuillez en définir un pour le voir.`);
            }
            message.channel.send(`\\✅ | Le message de levelup est : ${levelup}`);
            break;
        case 'set':
            if (!args[1]) return message.channel.send(`\\❌ | Veuillez entrer le message désiré. Exemple: **i!levelup set Bravo |USER| ! Tu passes lvl |LEVEL| (total exp : |EXP|) ! Tu gagnes donc |MONEY| ¥ !**`);
            try {
                args.shift();
                let settings = client.settings.get(message.guild.id);
                settings.levelup = args.join(' ');
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Le message de levelup a bien été modifié : **${args.join(' ').replace(/\*/g, '\\*')}**`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
        case 'reset':
            try {
                let settings = client.settings.get(message.guild.id);
                settings.levelup = undefined;
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Le message de levelup a bien été réinitialisé !`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
        case 'default':
            try {
                let settings = client.settings.get(message.guild.id);
                settings.levelup = 'Félicitations **|USER|** ! Tu passes au niveau **|LEVEL|**, tu gagnes donc **|MONEY| ¥** !';
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Le message de levelup a bien été remis à celui par défaut !`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
    }
}

exports.config = {
    name: 'LevelUP',
    description: 'Voir, définir ou réinitialiser le message de levelup.',
    usage: 'levelup <set|get|reset|default> [args...]',
    category: 'Configuration',
    cool: 15000,
    aliases: ['uplevel', 'lvlup'],
    uPerms: ['ADMINISTRATOR'],
    bPerms: [],
    usable: true,
    enabled: true
};