var {
    RichEmbed
} = require('discord.js');

exports.run = async function (client, message, args, utils, locale) {
    if (!client.customs.get(message.guild.id)) client.initCustoms(message.guild.id);

    let customs = client.customs.get(message.guild.id);

    switch (args[0]) {
        case 'add':
            if (customs.cmds.length == 10) return message.channel.send('\\❌ | Vous avez déja **atteint la limite** de commandes customisées !');
            if (!args[1] || !args[2]) return message.channel.send('\\❌ | Veuillez un nom de commande et un message. Exemple: **i!custom add lama Voici un lama !**');

            let cmd = args[1];

            if (cmd.length > 32) return message.channel.send('\\❌ | Le nom de la commande ne doit pas dépasser 32 caractères !**');

            if (customs.cmds.map(c => c.name).includes(cmd.toLowerCase())) return message.channel.send('\\❌ | Cette commande customisée **existe déja** !');

            args.shift();
            args.shift();

            let msg = args.join(' ');

            customs.cmds.push({
                name: cmd.toLowerCase(),
                message: msg
            });
            client.customs.set(message.guild.id, customs);

            let embed = new RichEmbed()
                .setColor('#41ff41')
                .setDescription(`La commande **${cmd.toLowerCase()}** a bien été **ajoutée** !`);

            message.channel.send(embed);
            break;
        case 'del':
            if (customs.cmds.length < 1) return message.channel.send('\\❌ | Vous n\'avez **aucune** commande customisée !');
            if (!args[1]) return message.channel.send('\\❌ | Veuillez le nom d\'une commande. Exemple: **i!custom del lama**');

            let cmd1 = args[1];

            if (!customs.cmds.map(c => c.name).includes(cmd1.toLowerCase())) return message.channel.send('\\❌ | Cette commande customisée **n\'existe pas** !');

            let res = customs.cmds.filter(c => c.name == cmd1)[0];
            customs.cmds.splice(customs.cmds.indexOf(res), 1);
            client.customs.set(message.guild.id, customs);

            let embed1 = new RichEmbed()
                .setColor('#ff4141')
                .setDescription(`La commande **${res.name}** a bien été **supprimée** !`);

            message.channel.send(embed1);
            break;
        case 'edit':
            if (!args[1] || !args[2]) return message.channel.send('\\❌ | Veuillez le nom de la commande et un message. Exemple: **i!custom edit lama Voici un autre lama !**');

            let cmd2 = args[1];

            if (!customs.cmds.map(c => c.name).includes(cmd2.toLowerCase())) return message.channel.send('\\❌ | Cette commande customisée **n\'existe pas** !');

            args.shift();
            args.shift();

            let msg2 = args.join(' ');

            customs.cmds.filter(c => c.name == cmd2)[0].message = msg2;
            client.customs.set(message.guild.id, customs);

            let embed2 = new RichEmbed()
                .setColor('#2277ff')
                .setDescription(`La commande **${cmd2.toLowerCase()}** a bien été **éditée** !`);

            message.channel.send(embed2);
            break;
        case 'list':
            if (customs.cmds.length < 1) return message.channel.send('\\❌ | Vous n\'avez **aucune** commande customisée !');

            let cmds = 1;

            let embed3 = new RichEmbed()
                .setColor('#2277ff')
                .setTitle('Liste des commandes customisées');

            customs.cmds.forEach(c => {
                embed3.addField(`Commande n°${cmds}`, `\\📰 Nom : \`${c.name}\`\n\\💬 Message : \`${c.message.replace(/\`/g, '\\\`').substring(0, 750)}\``);
                cmds++;
            })


            message.channel.send(embed3);
            break;
        default:
            message.channel.send(`\\❌ | Veuillez entrer une de ces sous-commande : **add | del | edit | list**.`);
            break;
    }
}

exports.config = {
    name: 'Custom',
    description: 'Ajouter, Supprimer ou Editer des commandes customisées',
    usage: 'custom <add|del|edit|list> [args...]',
    category: 'Configuration',
    cool: 5000,
    aliases: ['customcmd', 'ccmd', 'customs'],
    uPerms: ['ADMINISTRATOR'],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};