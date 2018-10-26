exports.run = async (client, message, args, utils, locale) => {
    if (!args || isNaN(args[0]) || args[0] < 1 || args[0] > 500) return message.channel.send(`\\❌ | Veuillez entrer un nombre de messages entre 1 et 500 à supprimer !`).then(msg => msg.delete(10000));
    try {
        let total = parseInt(args[0]);
        let times = 1;
        let count = total;

        while (total > 99) {
            times = times + 1;
            total = total - 100;
        };

        message.delete(100).then(() => {
            while (times > 1) {
                times = times - 1;
                message.channel.bulkDelete(100).catch(e => {
                    times = 1;
                });
            }
            message.channel.bulkDelete(total).catch(e => {
                return message.channel.send(`\\❌ | Je n'ai pas pu supprimer les messages !`).then(msg => msg.delete(10000).catch(e => e = ''))
            }).then(() => message.channel.send(`\\✅ | **${count}** messages ont été supprimés !`).then(msg => msg.delete(5000).catch(e => e = '')));
        })
    } catch (e) {
        return; //message.channel.send(`\\❌ | Je n'ai pas pu supprimer les messages !`).then(msg => msg.delete(10000).catch(e => e = ''));
    }
}

exports.config = {
    name: 'Purge',
    description: 'Supprimer x messages du channel.',
    usage: 'purge <1 - 500>',
    category: 'Modération',
    cool: 2000,
    aliases: ['nuke', 'clear', 'prune', 'clean'],
    uPerms: ['MANAGE_MESSAGES'],
    bPerms: ['MANAGE_MESSAGES'],
    usable: true,
    enabled: true
};