var {
    RichEmbed
} = require('discord.js');
var npm = require('api-npm');

exports.run = async function (client, message, args, utils, locale) {
    if (!args[0] || args[1]) return message.channel.send(`\\❌ | ${locale.UTILITAIRES.NPM.b}`);

    npm.getdetails(args[0].toLowerCase(), mod => {
        try {
            let embed = new RichEmbed()
                .setColor('#f44141')
                .setThumbnail('https://blog.christopherianmurphy.com/assets/images/posts/publishing-npm-packages/publishing-npm-packages.png')
                .addField(`Module`, `\\📰 Nom : \`${mod.name}\`\n\\🤵 Dev : \`${mod.author.name}\`\n\\📩 Email : \`${`${mod.author.email}`.replace('undefined', 'Undefined')}\``)
                .addField(locale.UTILITAIRES.NPM.b, `${mod.keywords.join(', ')}`)
                .addField(`GitHub`, mod.repository.url.substring(4, mod.repository.url.length))
                .addField(`Description`, mod.description)

            return message.channel.send(embed);
        } catch (e) {
            return message.channel.send(`\\❌ | ${locale.UTILITAIRES.NPM.c}`);
        }
    });
}

exports.config = {
    name: 'NPM',
    description: 'Rechercher un module NPM',
    usage: 'npm <nom>',
    category: 'Utilitaires',
    cool: 25000,
    aliases: ['getnpm', 'module', 'npmmodule'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};