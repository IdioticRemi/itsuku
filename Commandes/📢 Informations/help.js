var Discord = require('discord.js');
var fs = require('fs-nextra');

exports.run = async (client, message, args, utils, locale) => {
    try {
        let help = new Discord.RichEmbed().setColor('#2277ff');
        let enabled = 0;
        let disabled = 0;

        var dirs = await fs.readdir('./Commandes/');

        if (!args[0]) {
            dirs.forEach(async (dir) => {
                var category = '';
                client.commands.array().forEach(cmd => {
                    if (cmd.config.category != dir.split(' ')[1]) return;
                    if (cmd.config.usable == true) {
                        let hasPerms = true;
                        if (message.author.id != '350710888812249101') {
                            if (cmd.config.uPerms.includes('OWNER')) hasPerms = false;
                            else cmd.config.uPerms.forEach(perm => {
                                if (hasPerms == false) return;
                                if (perm == 'OWNER') return;
                                if (!message.channel.permissionsFor(message.author.id).has(perm)) hasPerms = false;
                            });
                        }

                        if (hasPerms == false) category += '\n\\🔹  ' + message.prefix + cmd.config.name + ' \\❌';
                        else category += '\n\\🔹  ' + message.prefix + cmd.config.name + ' \\✅';
                        enabled++;
                    } else {
                        category += '\n\\🔸  ' + message.prefix + cmd.config.name;
                        disabled++;
                    }
                })
                help.addField('\\' + dir, category, true);
            });
            help.setDescription(`**${enabled}** commande(s) actives : \\🔹 | **${disabled}** commande(s) en maintenance : \\🔸`);
            help.setFooter(`✅ Permissions suffisantes | ❌ Permissions insuffisantes`);

            message.author.send(help).catch(e => {
                return message.channel.send(`Je ne peut pas vous envoyer de messages privés, faites **i!hhelp** pour voir l'aide ici !`);
            });
            message.channel.send(`📨 **${message.author.username}**, Regardez vos messages privés !`);
        } else {
            if (dirs.map(d => d.split(' ')[1].toLowerCase()).includes(args[0].toLowerCase())) {
                dirs.forEach(async (dir) => {
                    if (dir.split(' ')[1].toLowerCase() != args[0].toLowerCase()) return;

                    let category = '';

                    client.commands.array().forEach(cmd => {
                        if (cmd.config.category != dir.split(' ')[1]) return;

                        if (cmd.config.usable == true) {
                            let hasPerms = true;
                            if (message.author.id != '350710888812249101') {
                                if (cmd.config.uPerms.includes('OWNER')) hasPerms = false;
                                else cmd.config.uPerms.forEach(perm => {
                                    if (hasPerms == false) return;
                                    if (perm == 'OWNER') return;
                                    if (!message.channel.permissionsFor(message.author.id).has(perm)) hasPerms = false;
                                });
                            }

                            if (hasPerms == false) category += '\n\\🔹  **' + message.prefix + cmd.config.name + '** : *' + cmd.config.description + '* \\❌';
                            else category += '\n\\🔹  **' + message.prefix + cmd.config.name + '** : *' + cmd.config.description + '* \\✅';
                            enabled++;
                        } else {
                            category += '\n\\🔸  **' + message.prefix + cmd.config.name + '** : *' + cmd.config.description + '*';
                            disabled++;
                        }
                    });
                    help.addField('\\' + dir, category, true);
                });
                help.setDescription(`**${enabled}** commande(s) actives : \\🔹 | **${disabled}** commande(s) en maintenance : \\🔸`);
                help.setFooter(`✅ Permissions suffisantes | ❌ Permissions insuffisantes`);

                message.author.send(help).catch(e => {
                    return message.channel.send(`Je ne peut pas vous envoyer de messages privés, faites **i!hhelp** pour voir l'aide ici !`)
                });
                message.channel.send(`📨 **${message.author.username}**, Regardez vos messages privés !`);
            } else {
                if (client.commands.has(args[0].toLowerCase())) {
                    var cmd = client.commands.get(args[0].toLowerCase());
                } else if (client.aliases.has(args[0].toLowerCase())) {
                    var cmd = client.commands.get(client.aliases.get(args[0].toLowerCase()));
                } else return message.channel.send(`\\❌ | Cette commande **n'existe pas **!`);

                let uPerms = `${cmd.config.uPerms.join(', ').replace('OWNER', 'Développeur du bot')}`;
                let bPerms = `${cmd.config.bPerms.join(', ')}`;

                if (uPerms.length < 1) uPerms = 'Aucune permission requise';
                if (bPerms.length < 1) bPerms = 'Aucune permission requise';

                let embed = new Discord.RichEmbed()
                    .setColor('#2277ff')
                    .addField('Commande', `\\📰 Commande : \`${cmd.config.name}\`\n\\📡 Aliases : \`${cmd.config.aliases.length > 0 ? cmd.config.aliases.join(', ') : 'Aucuns'}\`\n\\❓ Utilisation : \`i!${cmd.config.usage}\``)
                    .addField('Description', cmd.config.description)
                    .addField('Permissions (User)', uPerms, true)
                    .addField('Permissions (Bot)', bPerms, true);
                let ret = false;
                message.author.send(embed).catch(e => message.channel.send(`Je ne peut pas vous envoyer de messages privés, faites **i!hhelp [commande]** pour voir l'aide ici !`).then(() => ret = true));
                if (ret == true) return;
                message.channel.send(`📨 **${message.author.username}**, Regardez vos messages privés !`);
            }
        }
    } catch (e) {
        console.log(e.stack);
    }
};

exports.config = {
    name: 'Help',
    description: 'Voir toutes les commandes, voir les commandes d\'une catégorie ou d\'une commande (en MP)',
    usage: 'help [catégorie|commande]',
    category: 'Informations',
    cool: 20000,
    aliases: ['aide', 'h'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};