var Discord = require('discord.js');
var {
    version
} = require('discord.js');
var moment = require('moment');
var os = require('os');
require('moment-duration-format');
moment.locale('fr');

exports.run = async (client, message, args, utils, locale) => {
    let duration = moment.duration(client.uptime).format(' D [j], H [h], m [min], s [sec]');
    let ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    let channels = (client.channels.filter(c => c.type == 'text').size + client.channels.filter(c => c.type == 'voice').size);
    let m = await message.channel.send(`Chargement ...`);
    let tram = (os.totalmem() / 1024 / 1024).toFixed(0);
    let users = 0;
    client.guilds.forEach(g => users = users + g.memberCount);

    let embed = new Discord.RichEmbed()
        .setColor('#2277ff')
        .setThumbnail(client.user.avatarURL)
        .addField(`Itsuku`, `\\💛 Version : \`${client.infos.version}\`\n\\🤵 Développeur : \`${client.infos.author}\``)
        .addField(`Préfixes`, `\\📢 Global : \`i!\`\n\\🔧 Customisé : \`${client.settings.get(message.guild.id).prefix}\``)
        .addField(`Hébergement`, `\\💽 OS : \`${os.type()} (v${os.release()})\`\n\\💾 RAM Utilisée : \`${(ram * ((7+2)/12)).toFixed(2)} MB / ${tram} MB\`\n\\🕓 Uptime : \`${duration}\`\n\\💙 Discord.js : \`v${version}\`\n\\💚 Node.js : \`${process.version}\`\n\\🏓 Ping : \`${m.createdTimestamp - message.createdTimestamp} ms\`\n\\💻 Ping local : \`${((Date.now() - message.createdTimestamp) / 10).toFixed(0)} ms\`\n\\💡 Api : \`${Math.floor(client.ping)} ms\``, true)
        .addField(`Communauté`, `\\🚩 Serveurs : \`${client.guilds.size}\`\n\\🖤 Salons : \`${channels}\` :\n├ \\💬 Salons textuels : \`${client.channels.filter(c => c.type == 'text').size}\`\n└ \\🔊 Salons vocaux : \`${client.channels.filter(c => c.type == 'voice').size}\`\n\\👪 Utilisateurs (Tous) : \`${users}\`\n\\👪 Utilisateurs (Visibles) : \`${client.users.size}\` :\n├ \\👨 Humains : \`${client.users.filter(u => !u.bot).size}\`\n└ \\🤖 Bots : \`${client.users.filter(u => u.bot).size}\`\n\\👺 Emojis : \`${client.emojis.size}\``, true);

    m.edit(embed);
}

exports.config = {
    name: 'Debug',
    description: 'Voir les informations sur le bot',
    usage: 'debug',
    category: 'Informations',
    cool: 60000,
    aliases: ['info', 'about', 'binfo', 'botinfo'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};