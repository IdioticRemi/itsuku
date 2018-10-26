var encode = require('strict-uri-encode');
var { RichEmbed } = require('discord.js');

exports.run = async function (client, message, args, utils, locale) {
    if (!args[0]) return message.channel.send(`\\❌ | ${locale.UTILITAIRES.LMGTFY.a}`);
    let search = encode(args.join(' '));
    let link = `https://fr.lmgtfy.com/?q=${search}`;
    message.channel.send(new RichEmbed().setColor('#2277ff').setTitle(locale.UTILITAIRES.LMGTFY.b).setDescription(`\\🔍 ${locale.UTILITAIRES.LMGTFY.c} : \`${args.join(' ')}\``).setURL(link).setThumbnail('https://fr.lmgtfy.com/assets/sticker-b222a421fb6cf257985abfab188be7d6746866850efe2a800a3e57052e1a2411.png'))
}

exports.config = {
    name: 'LMGTFY',
    description: 'Montrer comment rechercher qqch sur google via LMGTFY',
    usage: 'lmgtfy <mots>',
    category: 'Utilitaires',
    cool: 15000,
    aliases: ['getgoogle', 'tutogoogle'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};