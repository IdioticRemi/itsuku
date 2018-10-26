var {
    RichEmbed
} = require('discord.js');
var weather = require('weather-js');

exports.run = async (client, message, args, utils, locale) => {
    if (!args[0]) {
        return message.channel.send(`\\❌ | ${locale.UTILITAIRES.METEO.a}`);
    } else {
        weather.find({
            search: args,
            degreeType: 'C'
        }, (err, result) => {
            if (err) {
                message.channel.send(`\\❌ | ${locale.UTILITAIRES.METEO.b}`);
            } else {
                if (result.length === 0) {
                    message.channel.send(`\\❌ | ${locale.UTILITAIRES.METEO.b}`);
                } else {
                    let current = result[0].current;
                    let location = result[0].location;

                    let embed = new RichEmbed()
                        .setColor('#2277ff')
                        .setThumbnail(current.imageUrl)
                        .addField(`Informations`, `\\🌇 ${locale.UTILITAIRES.METEO.c} : **\`${current.observationpoint}\`**\n\\🕓 Zone : **\`UTC ${location.timezone}\`**`)
                        .addField(`${locale.UTILITAIRES.METEO.d}`, `\\🌡 ${locale.UTILITAIRES.METEO.e} : **\`${current.temperature}°C\`**\n\\👨 ${locale.UTILITAIRES.METEO.f} : **\`${current.feelslike}°C\`**\n\\💨 ${locale.UTILITAIRES.METEO.g} : **\`${current.winddisplay}\`**\n\\☔ ${locale.UTILITAIRES.METEO.h} : **\`${current.humidity}%\`**`);
                    message.channel.send(embed);
                }
            }
        });
    }
}

exports.config = {
    name: 'Meteo',
    description: 'Voir la météo d\'un lieu.',
    usage: 'meteo <lieu>',
    category: 'Utilitaires',
    cool: 25000,
    aliases: ['weather', 'time'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};