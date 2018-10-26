var {
    RichEmbed
} = require('discord.js');

exports.run = async (client, message, args, utils, locale) => {
    let guild = message.guild;
    let date = new Date(guild.createdTimestamp);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month.toString().length < 2) month = `0${month}`;
    if (day.toString().length < 2) day = `0${day}`;
    let newDate = `${`${day}/${month}/${date.getFullYear()}`} à ${`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}`
    let channels = (guild.channels.filter(c => c.type == 'text').size + guild.channels.filter(c => c.type == 'voice').size);
    let afkChannel;
    let emojis = `${guild.emojis.map(e => e)}`;
    if (!guild.afkChannel) afkChannel = 'Aucun';
    else afkChannel = guild.afkChannel.name;

    let embed = new RichEmbed()
    .setColor('#2277ff')
    .setThumbnail(guild.iconURL)
    .addField(`Serveur`, `\\📰 Nom : \`${guild.name}\`\n\\🆔 ID : \`${guild.id}\`\n\\📅 Création du serveur : \`${newDate}\`\n\\👑 Propriétaire : \`${guild.owner.user.tag}\`\n\\🌇 Région : \`${guild.region}\``)
    .addField(`Communauté`, `\\🖤 Salons : \`${channels}\` :\n├ \\💬 Salons textuels : \`${guild.channels.filter(c => c.type == 'text').size}\`\n├ \\🔊 Salons vocaux : \`${guild.channels.filter(c => c.type == 'voice').size}\`\n└ \\💤 Channel AFK : \`${afkChannel}\`\n\\👪 Utilisateurs : \`${guild.members.size}\` :\n├ \\👨 Humains : \`${guild.members.filter(m => !m.user.bot).size}\`\n└ \\🤖 Bots : \`${guild.members.filter(m => m.user.bot).size}\`\n\\👺 Emojis : \`${guild.emojis.size}\`\n\\🎭 Roles : \`${guild.roles.size}\``)
    if (emojis.length < 1) embed.addField(`Emojis`, `Aucun emoji`);
    else {
        let emojis = [];

        guild.emojis.array().forEach(e => {
            if (emojis.join(' ').length + e.name.length + 10 < 1000) emojis.push(`${e}`);
            else return;
        })

        embed.addField(`Emojis`, `${emojis.join(' ')}`);
    }

    let roles = [];

    guild.roles.array().forEach(role => {
        if (roles.join(', ').length + role.id.length + 10 < 1000) roles.push(`${role}`);
        else return;
    })

    embed.addField(`Roles`, `${roles.join(', ')}`);

    message.channel.send(embed);
}

exports.config = {
    name: 'Guild',
    description: 'Voir les infos du serveur.',
    usage: 'guild',
    category: 'Informations',
    cool: 20000,
    aliases: ['server', 'serverinfo', 'sinfo', 'si'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};