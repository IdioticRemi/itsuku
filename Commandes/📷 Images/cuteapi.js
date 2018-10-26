var {
    RichEmbed
} = require('discord.js');
var Cute = require('cuteapi');

exports.run = async (client, message, args, utils, locale) => {
    var API = new Cute(client.config.CUTE_API_KEY);
    let commands = ['list', 'link', 'random'];
    await API.getTypes().then(list => list.type.forEach(type => commands.push(type)));
    if (!args[0] || !isNaN(args[0]) || !commands.includes(args[0].toLowerCase())) return message.channel.send(`\\❌ | Veuillez entrer une sous-commande ! Voir la liste : **i!cuteapi list**.`);
    if (args[0].toLowerCase() == 'list') {
        commands.shift();
        message.channel.send(`Liste des sous-commandes de l'API : \n- **${commands.join('**\n- **')}**`);
    } else if (args[0].toLowerCase() == 'link') {
        return message.channel.send(`\\✅ | Voici le lien pour poster des images sur la CuteAPI : <https://cute-api.tk/>`);
    } else if (args[0].toLowerCase() == 'random') {
        API.getRandom().then(img => {
            API.getVersion().then(val => {
                let embed = new RichEmbed()
                .setColor('#2277ff')
                .setDescription(`\\📷 Type : \`${img.type}\`\n\\👑 Auteur : \`${img.auteur}\`\n\\💦 NSFW : \`${img.nsfw.toString().replace('false', 'non').replace('true', 'oui')}\`\n\\📃 Tags : \`${img.tag.join(', ')}\``)
                .setThumbnail('https://cute-api.tk/cuteapiicon.png')
                .setImage(img.url)
                .setFooter('© CuteAPI v' + val.version);
                return message.channel.send(embed);
            });
        }).catch(err => {
            return message.channel.send(`\\❌ | Aucune image trouvée, vous pouvez en ajouter une ici : <https://api.takohell.com/>`);
        })
    } else {
        API.getJSON(args[0].toLowerCase()).then(img => {
            API.getVersion().then(val => {
                let embed = new RichEmbed()
                .setColor('#2277ff')
                .setDescription(`\\📷 Type : \`${img.type}\`\n\\👑 Auteur : \`${img.auteur}\`\n\\💦 NSFW : \`${img.nsfw.toString().replace('false', 'non').replace('true', 'oui')}\`\n\\📃 Tags : \`${img.tag.join(', ')}\``)
                .setThumbnail('https://cute-api.tk/cuteapiicon.png')
                .setImage(img.url)
                .setFooter('© CuteAPI v' + val.version);
                return message.channel.send(embed);
            });
        }).catch(err => {
            return message.channel.send(`\\❌ | Aucune image trouvée, vous pouvez en ajouter une ici : <https://api.takohell.com/>`);
        })
    }
}

exports.config = {
    name: 'CuteAPI',
    description: 'Chercher une image sur la CuteAPI',
    usage: 'cuteapi <list|(type)>',
    category: 'Images',
    cool: 15000,
    aliases: ['capi', 'apicute', 'cute'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};