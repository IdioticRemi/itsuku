var Discord = require('discord.js');

exports.run = async function (client, message, args, utils, locale) {
    let mutelist = client.settings.get(message.guild.id).mutes;

    if (mutelist.length < 1) return message.channel.send(`Il n'y a aucune personne mute sur le serveur !`);

    let ret = false;
    let i = 1;

    let embed = new Discord.RichEmbed()
        .setColor('#2277ff')
        .setDescription('\n');

    mutelist.forEach(id => {
        if (ret == true) return
        if (!message.guild.member(id)) return;

        let msg = `**${i} 🔸 ${message.guild.member(id).user.tag}**`;

        if (embed.description.length + `\n${msg}`.length > 1950) return ret = true;

        embed.setDescription(embed.description + `\n${msg}`);
        i++;
    });

    await message.channel.send(embed);
}

exports.config = {
    name: 'MuteList',
    description: 'Voir tout les utilisateurs mutes du serveur',
    usage: 'mutelist',
    category: 'Modération',
    cool: 2000,
    aliases: ['shutlist', 'shutuplist', 'listmute', 'mutes'],
    uPerms: ['MANAGE_MESSAGES'],
    bPerms: ['MANAGE_MESSAGES', 'EMBED_LINKS'],
    usable: true,
    enabled: true
};