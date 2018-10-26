var chalk = require('chalk');

module.exports = async (client, message) => {

    // Conditions

    if (message.channel.type != 'text' || message.author.bot) return;
    if (!message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return;

    // Settings

    if (!client.settings.get('Itsuku')) client.settings.set('Itsuku', {
        usable: true
    });
    if (!client.settings.get(message.guild.id)) client.initSettings(message.guild.id);
    if (!client.userlist.get(message.author.id)) client.initUser(message.author);
    if (!client.userlist.get(message.author.id).scores.filter(f => f.guild == message.guild.id)[0]) client.initExp(message);

    // Variables

    let utils = require('../Utilitaires/utils.js');
    let guild = message.guild.id;
    let gPrefix = 'i!';
    let settings = await client.getSettings(guild);

    if (!settings.locale) {
        settings.locale = 'fr';
        client.settings.set(guild, settings);
    }

    let locale = client.locales.get(settings.locale);

    let prefix = settings.prefix;

    // Mute users

    if (settings.mutes.includes(message.author.id)) {
        if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) return message.delete();
    }

    // Sent a Link ?

    if (message.content.includes('http://') && settings.antilink == true || message.content.includes('https://') && settings.antilink == true) {
        if (message.channel.permissionsFor(message.author.id).has("MANAGE_MESSAGES")) return;
        message.author.send(`\\❌ | Vous ne pouvez pas envoyer de **liens** dans ce serveur !`).catch(e => message.channel.send(`\\❌ | ${message.author}, vous ne pouvez pas envoyer de **liens** dans ce serveur !`));
        if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) return message.delete();
    }

    // Sent a bad word ?

    settings.badwords.forEach(w => {
        if (message.content.toLowerCase().includes(w.toLowerCase())) {
            //if (message.channel.permissionsFor(message.author.id).has("MANAGE_MESSAGES")) return;
            message.author.send(`\\❌ | Vous avez envoyé un message contenant un des mots interdits sur le serveur ! (**${w}**)`).catch(e => message.channel.send(`\\❌ | ${message.author}, vous avez envoyé un message contenant un des mots interdits sur le serveur ! (**${w}**)`));
            if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) return message.delete();
        } else return;
    });

    // Check if starts with mention of the bot

    if (message.content.startsWith('<@' + client.user.id + '>')) return message.channel.send(`Salut **${message.author.username}** ! Ca va ? Mon préfixe sur ce serveur est : **${prefix}**`);

    // StartsWith Prefix ?

    if (!message.content.toLowerCase().startsWith(gPrefix)) {
        if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) {
            return client.expMonitor(message);
        } else prefix = prefix;
    } else prefix = gPrefix;


    // Variables

    let command = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
    let args = message.content.split(/ +/g).slice(1);

    message.prefix = settings.prefix;

    // Finding Command

    if (client.commands.has(command)) {
        var cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        var cmd = client.commands.get(client.aliases.get(command));
    } else {
        let customs = client.customs.get(guild);

        if (customs && customs.cmds.filter(c => c.name == command)[0]) {
            return message.channel.send(customs.cmds.filter(c => c.name == command)[0].message);
        } else return;
    }

    // Check Maintenance

    if (client.settings.get('Itsuku').usable == false && message.author.id != "350710888812249101") return message.channel.send(`\\❌ | Je suis actuellement **en maintenance**, veuillez patienter !`);

    // Command Usable ?

    if (!cmd.config.usable && message.author.id != "350710888812249101") return message.channel.send(`\\❌ | Cette commande est **en maintenance**, veuillez patienter !`);

    // Cooldown

    if (await client.isCooldown(message, cmd) == true) return;

    if (message.author.id != "350710888812249101") {
        let u = client.userlist.get(message.author.id);
        let push = {
            name: cmd.config.name,
            last: message.createdTimestamp
        };
        let existing = u.cooldowns.filter(c => c.name == cmd.config.name)[0];
        if (existing) u.cooldowns.filter(c => c.name == cmd.config.name)[0].last = push.last;
        else u.cooldowns.push(push);
        client.userlist.set(message.author.id, u);
    }

    // Check Permissions

    if (message.author.id != "350710888812249101") {
        if (await client.uHasPerms(message, message.author.id, cmd) == true) return;
    }

    if (await client.bHasPerms(message, message.author.id, cmd) == true) return;

    // Execute Command

    try {
        console.log(chalk.grey('[') + chalk.green(new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() + ' ' + new Date().toTimeString().split(' ')[0]) + chalk.grey('] ') + chalk.yellow(`Cmd : ${cmd.config.name} | User : ${message.author.tag} | ID : ${message.author.id} | Guild : ${message.guild.name} (${message.guild.id})`));
        client.rEco(message.author.id);
        cmd.run(client, message, args, utils, locale, client.queue);
    } catch (e) {
        message.channel.send(`\\❌ | Une erreur est survenue lors du lancement de la commande.`);
        console.log(e.stack);
    }
}