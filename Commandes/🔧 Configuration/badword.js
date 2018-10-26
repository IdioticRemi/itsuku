exports.run = async (client, message, args, utils, locale) => {
    if (!args[0] || !isNaN(args[0]) || !['add', 'rem', 'get', 'reset'].includes(args[0].toLowerCase())) return message.channel.send(`\\❌ | Veuillez entrer une sous-commande : **add | rem | get | reset**.`);
    switch (args[0].toLowerCase()) {
        case 'get':
            let settings = await client.getSettings(message.guild.id);
            if (settings.badwords.length < 1) return message.channel.send(`\\❌ | Il n'y a pas encore de mots interdits sur le serveur !`);

            message.channel.send(`\\✅ | Les mots interdits sont : **${settings.badwords.join('**, **')}**`);
            break;
        case 'add':
            if (!args[1]) return message.channel.send(`\\❌ | Veuillez entrer les mots à ajouter. Exemple: **i!badword add mot1,mot2,mot3,etc...**`);
            try {
                args.shift();

                let addwords = [];
                let words = args.join('').split(',');
                let settings = await client.getSettings(message.guild.id);
                words.forEach(w => {
                    if (settings.badwords.includes(w.toLowerCase())) return;
                    else {
                        settings.badwords.push(w.toLowerCase());
                        addwords.push(w);
                    }
                });
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Les mots interdits suivants ont/a étés ajoutés : **${addwords.length>0 ? addwords.join('**, **') : '__Aucun, ils existent déja__'}**`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
        case 'rem':
            if (!args[1]) return message.channel.send(`\\❌ | Veuillez entrer les mots à supprimer. Exemple: **i!badword add mot1,mot2,mot3,etc...**`);
            try {
                args.shift();

                let delwords = [];
                let words = args.join('').split(',');
                let settings = await client.getSettings(message.guild.id);
                words.forEach(w => {
                    if (!settings.badwords.includes(w.toLowerCase())) return;
                    else {
                        settings.badwords.splice(settings.badwords.indexOf(w.toLowerCase()), 1);
                        client.settings.set(message.guild.id, settings);
                        delwords.push(w);
                    }
                });
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | Les mots interdits suivants ont/a étés supprimés : **${delwords.join('**, **')}**`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
        case 'reset':
            try {
                let settings = await client.getSettings(message.guild.id);
                settings.badwords = [];
                client.settings.set(message.guild.id, settings);

                message.channel.send(`\\✅ | La liste des mots interdits a bien été réinitialisée !`);
            } catch (e) {
                message.channel.send(`\\❌ | Une erreur est survenue lors de la modification de la configuration.`);
            }
            break;
    }
}

exports.config = {
    name: 'Badword',
    description: 'Voir, ajouter, supprimer des mots interdits ou bien tous les supprimer.',
    usage: 'badword <add|rem|get|reset> [args...]',
    category: 'Configuration',
    cool: 15000,
    aliases: ['bw', 'badwords'],
    uPerms: ['ADMINISTRATOR'],
    bPerms: [],
    usable: true,
    enabled: true
};