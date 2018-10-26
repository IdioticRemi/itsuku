exports.run = async function (client, message, args, utils, locale) {
    if (!args[0]) return message.channel.send(`\\❌ | Veuillez entrer **un pseudo** (pour vous) ou **mentionner quelqu'un** et entrer **un pseudo** !`);

    let target = message.mentions.users.first() ? message.guild.member(message.mentions.users.first()) : message.guild.member(message.author);
    let ret = false;

    if (!message.mentions.users.first()) {
        target.setNickname(args.join(' '), 'Changed by ' + message.author.tag).catch(e => {
            ret = true;
            message.channel.send(`\\❌ | Je ne suis pas **supérieur** à vous ou le pseudo contient des **caractères invalides** !`);
        }).then(() => {
            if (ret == true) return;

            message.channel.send(`\\✅ | Votre pseudo a été changé en **${args.join(' ')}** !`);
        });
    } else {
        if (!args[1]) return message.channel.send(`\\❌ | Veuillez entrer **un pseudo** à donner à cette personne !`);

        args.shift();

        target.setNickname(args.join(' '), 'Changed by ' + message.author.tag).catch(e => {
            ret = true;
            message.channel.send(`\\❌ | Je ne suis pas **supérieur** à cette personne ou le pseudo contient des **caractères invalides** !`);
        }).then(() => {
            if (ret == true) return;

            message.channel.send(`\\✅ | Le pseudo de **${target.user.tag}** a été changé en **${args.join(' ')}** !`);
        })
    }
}

exports.config = {
    name: 'Nick',
    description: 'Changer le pseudo de quelqu\'un ou son propre pseudo',
    usage: 'nick <pseudo> || nick <@user> <pseudo>',
    category: 'Modération',
    cool: 2000,
    aliases: ['rename', 'nickname', 'pseudo'],
    uPerms: ['MANAGE_NICKNAMES'],
    bPerms: ['MANAGE_NICKNAMES'],
    usable: true,
    enabled: true
};