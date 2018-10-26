var {
    RichEmbed
} = require('discord.js');

var arraySort = require('array-sort');

exports.run = async (client, message, args, utils, locale) => {
    let invites = await message.guild.fetchInvites();

    invites = invites.array();

    if (invites.length < 1) {
        return message.channel.send(`\\❌ | ${locale.UTILITAIRES.INVITES.a}`);
    }

    arraySort(invites, 'uses', {
        reverse: true
    });

    if (invites.length > 20) {
        invites = invites.slice(0, 20);
    }

    let possibleInvites = '';
    let i = 1;
    invites.forEach(invite => {
        possibleInvites = possibleInvites + `\n**${i} 🔸 ${invite.inviter.username}** *${invite.uses} ${invite.uses > 1 ? locale.UTILITAIRES.INVITES.b + 's' : locale.UTILITAIRES.INVITES.b}*`;
        i++;
    });

    let embed = new RichEmbed()
        .setColor('#2277ff')
        .setTitle(locale.UTILITAIRES.INVITES.c)
        .setDescription(possibleInvites);

    message.channel.send(embed);
}

exports.config = {
    name: 'Invites',
    description: 'Voir le classement des invitations.',
    usage: 'invites',
    category: 'Utilitaires',
    cool: 30000,
    aliases: ['invitelb', 'inviteslb', 'ilb'],
    uPerms: [],
    bPerms: ['ADMINISTRATOR'],
    usable: true,
    enabled: true
};