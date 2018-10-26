var ms = require('ms');
var {
    RichEmbed
} = require('discord.js');

exports.run = async function (client, message, args, utils, locale, queue) {
    let serverQueue = queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send(locale.MUSIQUE.GLOBAL.a);

    let q = '';
    let dur;
    let realtime;
    let i = 1;
    while (i <= 8) {
        if (serverQueue.songs[i]) {
            let t = serverQueue.songs[i].duration.split(':');
            if (t[0] == '0') t.splice(0, 1);
            if (t[0]) {
                while (`${t[0]}`.length < 2) t[0] = `0${t[0]}`;
            }
            if (t[1]) {
                while (`${t[1]}`.length < 2) t[1] = `0${t[1]}`;
            }
            if (t[2]) {
                while (`${t[2]}`.length < 2) t[2] = `0${t[2]}`;
            }
            t = t.join(':');
            q += `\n🔸 **${i}** : ${serverQueue.songs[i].title}  (**${t}**)`;
        }
        i++;
    }
    dur = serverQueue.songs[0].duration.split(':');
    if (dur[0] == '0') dur.splice(0, 1)
    if (dur[0]) {
        while (`${dur[0]}`.length < 2) dur[0] = `0${dur[0]}`;
    }
    if (dur[1]) {
        while (`${dur[1]}`.length < 2) dur[1] = `0${dur[1]}`;
    }
    if (dur[2]) {
        while (`${dur[2]}`.length < 2) dur[2] = `0${dur[2]}`;
    }
    dur = dur.join(':');

    realtime = `${Math.floor(ms(ms(serverQueue.connection.dispatcher.time / 1000, {long: true})))}`;
    let hours = 0, mins = 0, secs = realtime;
    while (secs >= 60) {
        mins++;
        secs = secs - 60;
    }
    while (mins >= 60) {
        hours++;
        mins = mins - 60;
    }
    realtime = `${hours}:${mins}:${secs}`.split(':');
    if (realtime[0] == '0') realtime.splice(0, 1);
    if (realtime[0]) {
        while (`${realtime[0]}`.length < 2) realtime[0] = `0${realtime[0]}`;
    }
    if (realtime[1]) {
        while (`${realtime[1]}`.length < 2) realtime[1] = `0${realtime[1]}`;
    }
    if (realtime[2]) {
        while (`${realtime[2]}`.length < 2) realtime[2] = `0${realtime[2]}`;
    }
    realtime = realtime.join(':');

    let embed = new RichEmbed().setColor('#2277ff');
    embed.addField(locale.MUSIQUE.QUEUE.a, `🔸 ${serverQueue.songs[0].title} (**${realtime}**/**${dur}**)`);
    if (q == ``) embed.addField(`Queue`, `🔹 ${locale.MUSIQUE.QUEUE.b}`);
    else embed.addField(`Queue`, q);
    message.channel.send(embed);
}

exports.config = {
    name: 'Queue',
    description: 'Afficher la liste des musiques',
    usage: 'queue',
    category: 'Musique',
    cool: 5000,
    aliases: ['list', 'musics', 'q'],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};