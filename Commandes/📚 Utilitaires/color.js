const {
    RichEmbed
} = require('discord.js');

exports.run = async (client, message, args, utils, locale) => {
    let colors = message.guild.roles.filter(role => role.name.startsWith('#'));
    if (colors.size < 1) return message.channel.send(`\\❌ | ${locale.UTILITAIRES.COLOR.a}`);

    let str = args.join(" ");
    let role = colors.find(role => role.name.slice(1).toLowerCase() === str.toLowerCase());

    if (!role) {
        let colorList = ``;
        colors.forEach(col => {
            colorList = `${colorList}\n- ${col.name.replace(/#/g, '')}`;
        })
        return message.channel.send(
            new RichEmbed()
            .addField(locale.UTILITAIRES.COLOR.b, `${colorList}`)
            .setColor('#2277ff')
        );
    }

    let ret = false;
    await message.member.removeRoles(colors).catch(e => {
        ret = true;
        return message.channel.send(`\\❌ | ${locale.UTILITAIRES.COLOR.c}`)
    });
    await message.member.addRole(role).catch(e => {
        ret = true;
        return message.channel.send(`\\❌ | ${locale.UTILITAIRES.COLOR.c}`)
    });
    if (ret == true) return;
    message.channel.send(`\\✅ | ${locale.UTILITAIRES.COLOR.d} **${role.name.replace(/#/g, '').toLowerCase()}** !`);
};

exports.config = {
    name: 'Color',
    description: 'Rejoindre un role de couleur sur le serveur',
    usage: 'color <couleur>',
    category: 'Utilitaires',
    cool: 10000,
    aliases: ['couleur'],
    uPerms: [],
    bPerms: ['MANAGE_ROLES', 'MANAGE_ROLES_OR_PERMISSIONS'],
    usable: true,
    enabled: true
};