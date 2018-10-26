var Discord = require('discord.js');

exports.run = async function (client, message, args, utils, locale) {
    let ss = client.guilds.get('430801236606976001');
    let embed = new Discord.RichEmbed()
        .setColor('#2277ff')
        .addField('Membres', `<:online:431524059268907010> En ligne : ${ss.members.filter(m => m.user.presence.status != 'offline').size}\n<:offline:431524059268775936> Hors Ligne : ${ss.members.filter(m => m.user.presence.status == 'offline').size}`, true)
        .addField('Lien', `[Cliquez ici](https://discord.gg/MAHB2C9)`, true)
        .setThumbnail(client.user.avatarURL);

    message.channel.send(embed);
}

exports.config = {
    name: 'Support',
    description: 'Voir le lien et quelques infos sur mon serveur d\'aide',
    usage: 'support',
    category: 'Itsuku',
    cool: 10000,
    aliases: ['suppserver', 'supp'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};