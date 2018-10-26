exports.run = async (client, message, args, utils, locale) => {
    if (!args[0] || !isNaN(args[0]) || !['set', 'get', 'reset'].includes(args[0].toLowerCase())) return message.channel.send(`\\❌ | Veuillez entrer une sous-commande : **set | get | reset**.`);
    switch (args[0].toLowerCase()) {
        case 'get':
            let roleId = client.settings.get(message.guild.id).autorole;
            if (!roleId) {
                return message.channel.send(`\\❌ | **Aucun role défini**, veuillez en définir un pour le voir.`);
            }
            let role = message.guild.roles.get(roleId);
            if (!role) {
                return message.channel.send(`\\❌ | **Le role défini n'existe plus**, veuillez redéfinir celui-ci.`);
            }
            message.channel.send(`\\✅ | Le rôle de bienvenue est : **${role}**`);
            break;
        case 'set':
            if (!args[1] || !message.mentions.roles.first()) return message.channel.send(`\\❌ | Veuillez entrer le role désiré. Exemple: **i!autorole set @membres**`);
            try {
                let settings = client.settings.get(message.guild.id);
                settings.autorole = message.mentions.roles.first().id;
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Le rôle de bienvenue a bien été modifié : **${message.mentions.roles.first()}**`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
        case 'reset':
            try {
                let settings = client.settings.get(message.guild.id);
                settings.autorole = undefined;
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Le rôle de bienvenue a bien été réinitialisé !`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
    }
}

exports.config = {
    name: 'AutoRole',
    description: 'Voir, définir ou réinitialiser le role bienvenue.',
    usage: 'autorole <set|get|reset> [args...]',
    category: 'Configuration',
    cool: 15000,
    aliases: ['arole', 'ar'],
    uPerms: ['ADMINISTRATOR'],
    bPerms: [],
    usable: true,
    enabled: true
};