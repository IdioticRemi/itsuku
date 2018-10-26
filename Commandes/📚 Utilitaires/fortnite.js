var {
    RichEmbed
} = require('discord.js');
var Fortnite = require('fortnite');

exports.run = async function (client, message, args, utils, locale) {
    if (!args[0] || !['pc', 'xbl', 'psn'].includes(args[0].toLowerCase())) return message.channel.send(`\\❌ | ${locale.UTILITAIRES.FORTNITE.a}`);
    if (!args[1]) return message.channel.send(`\\❌ | ${locale.UTILITAIRES.FORTNITE.b}`);

    let platform = args.shift();
    let username = args.join(' ');

    new Fortnite(client.config.TRN_KEY).getInfo(username, platform.toLowerCase()).then(data => {
        try {
            let embed = new RichEmbed()
                .setColor('#2277ff')
                .setAuthor(`Stats Fortnite : ${username}`, `https://images-ext-1.discordapp.net/external/_2yiA189lGQS-fvKiO79CpOuzOFr5TB_nS0a7vMAMmQ/https/imgur.com/NHeli7x.png`)
                .setThumbnail(`https://images-ext-1.discordapp.net/external/hjiOTLftSvhvQ0xNFqmo4KKZLpsb57fJwIcvBoidTRU/%3Fcb%3D20170806011008/https/vignette.wikia.nocookie.net/fortnite/images/d/d8/Icon_Founders_Badge.png/revision/latest?width=80&height=80`)
                .addField(locale.UTILITAIRES.FORTNITE.c, `\\🥇 Top 1 : \`${data.lifetimeStats[8].value}\`\n\\🥈 Top 3 : \`${data.lifetimeStats[0].value}\`\n\\🥉 Top 5 : \`${data.lifetimeStats[1].value}\`\n\\🏅 Top 6 : \`${data.lifetimeStats[3].value}\`\n\\🏅 Top 12 : \`${data.lifetimeStats[4].value}\`\n\\🏅 Top 25 : \`${data.lifetimeStats[5].value}\``, true)
                .addField(locale.UTILITAIRES.FORTNITE.d, `\\🎰 Score : \`${data.lifetimeStats[6].value}\`\n\\🎮 Matchs joués : \`${data.lifetimeStats[7].value}\`\n\\🏆 ${locale.UTILITAIRES.FORTNITE.e} : \`${data.lifetimeStats[8].value}\`\n\\🏆 % ${locale.UTILITAIRES.FORTNITE.e} : \`${data.lifetimeStats[9].value}\``, true)
                .addField(`Kills Stats`, `\\🔪 Kills : \`${data.lifetimeStats[10].value}\`\n\\👊 Ratio K/D : \`${data.lifetimeStats[11].value}\``, true)
                //.addField(`Stats temporelles`, `\\🕓 Temps de jeu : \`${data.lifetimeStats[13].value}\`\n\\🏹 Temps de survie : \`${data.lifetimeStats[14].value}\``);

            return message.channel.send(embed);
        } catch (err) {
            console.log(err)
        }
    }).catch(err => {
        return message.channel.send(`\\❌ | ${locale.UTILITAIRES.FORTNITE.f}`);
    });
}

exports.config = {
    name: 'Fortnite',
    description: 'Voir les stats fortnite de qqn sur sa plateforme',
    usage: 'fortnite <pc|xbl|psn> <pseudo>',
    category: 'Utilitaires',
    cool: 15000,
    aliases: ['fn', 'trn', 'track'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};