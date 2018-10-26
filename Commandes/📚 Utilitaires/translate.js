var {
    RichEmbed
} = require('discord.js');
var translate = require('google-translate-api');

exports.run = async function (client, message, args, utils, locale) {
    if (!args[0] || !args[1]) return message.channel.send(`\\❌ | ${locale.UTILITAIRES.TRANSLATE.a}`);

    let lang = args.shift();
    lang = lang.toLowerCase();
    translate(args.join(' '), {
        to: lang
    }).then(res => {
        let embed = new RichEmbed()
            .setColor('#2277ff')
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png')
            .addField(locale.UTILITAIRES.TRANSLATE.b, `\\🌐 Locale : \`${res.from.language.iso}\`\n\\📃 Text : \`${args.join(' ')}\``)
            .addField(locale.UTILITAIRES.TRANSLATE.c, `\\🌐 Locale : \`${lang}\`\n\\📰 Text : \`${res.text}\``);
        message.channel.send(embed);
    }).catch(err => {
        message.channel.send(`\\❌ | ${locale.UTILITAIRES.TRANSLATE.d}`);
    });
}

exports.config = {
    name: 'Translate',
    description: 'Traduire du texte dans un autre langue',
    usage: 'translate <langue> <texte...>',
    category: 'Utilitaires',
    cool: 30000,
    aliases: ['traduction', 'trad', 'gtrad'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};