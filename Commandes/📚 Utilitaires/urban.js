var {
    RichEmbed
} = require('discord.js');
var urban = require('relevant-urban');

exports.run = async (client, message, args, utils, locale) => {
    if (!args[0]) return client.no(message, `${locale.UTILITAIRES.URBAN.a}`);

    let res = await urban(args.join(' ')).catch(e => {
        return client.no(message, `${locale.UTILITAIRES.URBAN.b}`);
    });

    let embed = new RichEmbed()
        .setColor('#2277ff')
        .addField(`\\📖 Définition(s) : ${res.word}`, res.definition)
        .addField('\\📚 Exemple(s)', res.example)
        .addField('\\🔗 ' + locale.UTILITAIRES.URBAN.c, res.urbanURL)
        .setURL(res.urbanURL);

    message.channel.send(embed);
}

exports.config = {
    name: 'Urban',
    description: 'Voir un mot du dictionnaire urbanisé anglais.',
    usage: 'urban <mot(s)>',
    category: 'Utilitaires',
    cool: 15000,
    aliases: ['urbandic'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};