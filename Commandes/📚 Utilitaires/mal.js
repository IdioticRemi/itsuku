var malScraper = require('mal-scraper')
var {
    RichEmbed
} = require('discord.js');

exports.run = async function (client, message, args, utils, locale) {
    if (!args[0]) return message.channel.send(`\\❌ | ${locale.UTILITAIRES.MAL.a}`);

    let embed = new RichEmbed()
        .setColor('#2277ff')

    malScraper.getInfoFromName(args.join(' '))
        .then(data => {
            embed.setTitle(data.title);
            embed.setURL(data.url);
            embed.setDescription(data.synopsis);
            embed.addField('Status', data.status, true);
            embed.addField('Type', data.type, true);
            embed.addField('Genres / Tags', data.genres.join(', '), false);
            embed.addField('Dates', data.aired, false);
            embed.addField('Episodes', data.episodes, true);
            embed.addField(locale.UTILITAIRES.MAL.b, data.duration, true);
            embed.addField('Note / 10', data.score, true);
            embed.addField(locale.UTILITAIRES.MAL.c, data.ranked, true);
            embed.addField(locale.UTILITAIRES.MAL.d, data.popularity, true)
            embed.addField(locale.UTILITAIRES.MAL.e, data.favorites, true);
            embed.addField(locale.UTILITAIRES.MAL.f, data.producers.join(', '), true)
            embed.addField('Studio(s)', data.studios.join(', '), false);

            message.channel.send(embed);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.config = {
    name: 'MAL',
    description: 'Chercher un anime/manga sur MyAnimeList',
    usage: 'mal <nom>',
    category: 'Utilitaires',
    cool: 15000,
    aliases: ['myanimelist', 'manga', 'anime'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};