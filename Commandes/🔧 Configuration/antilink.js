exports.run = async function (client, message, args, utils, locale) {
    if (!args[0] || !isNaN(args[0]) || !['get', 'enable', 'disable'].includes(args[0].toLowerCase())) return message.channel.send(`\\❌ | Veuillez entrer une sous-commande : **get | enable | disable**.`);
    switch (args[0].toLowerCase()) {
        case 'get':
            let antilink = client.settings.get(message.guild.id).antilink.toString();

            message.channel.send(`\\✅ | Le système d'antilink est actuellement **${antilink.replace('true', 'activé').replace('false', 'désactivé')}** !`);
            break;
        case 'enable':
            try {
                args.shift();
                let settings = client.settings.get(message.guild.id);
                settings.antilink = true;
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Le système d'antilink a bien été **activé** !`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
        case 'disable':
            try {
                args.shift();
                let settings = client.settings.get(message.guild.id);
                settings.antilink = false;
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Le système d'antilink a bien été **désactivé** !`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
    }
}

exports.config = {
    name: 'AntiLink',
    description: 'Activer ou Désactiver le système d\'antilink',
    usage: 'antilink <enable|disable>',
    category: 'Configuration',
    cool: 15000,
    aliases: ['antilien', 'al'],
    uPerms: ['ADMINISTRATOR'],
    bPerms: [],
    usable: true,
    enabled: true
};