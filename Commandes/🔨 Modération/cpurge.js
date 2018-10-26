exports.run = async (client, message, args, utils, locale) => {
    try {
        let times = 1;
        let lastCount = 0;
        let count = -1;

        function fetchStuff() {
            message.channel.fetchMessages({
                limit: 100
            }).then(async (msgs) => {
                let msgCount = msgs.array().length;
                count = count + msgCount;

                if (parseInt(msgCount) > 99) {
                    times = times + 1;
                    message.channel.bulkDelete(100).catch(e => {
                        return message.channel.send(`\\❌ | Je n'ai pas pu supprimer les messages !`).then(msg => msg.delete(10000).catch(e => e = ''))
                    }).then(() => fetchStuff());
                } else {
                    lastCount = msgCount;
                    message.channel.bulkDelete(lastCount).catch(e => {
                        return message.channel.send(`\\❌ | Je n'ai pas pu supprimer les messages !`).then(msg => msg.delete(10000).catch(e => e = ''))
                    }).then(() => message.channel.send(`\\✅ | Un total de **${count}** messages à été supprimé !`).then(msg => msg.delete(5000).catch(e => e = '')));
                }
            });
        };

        await fetchStuff();
    } catch (e) {
        return message.channel.send(`\\❌ | Je n'ai pas pu supprimer les messages !`).then(msg => msg.delete(10000).catch(e => e = ''));
    }
}

exports.config = {
    name: 'CPurge',
    description: 'Supprimer tout les messages du channel.',
    usage: 'cpurge',
    category: 'Modération',
    cool: 10000,
    aliases: ['purgec', 'channelpurge', 'cleanchannel'],
    uPerms: ['MANAGE_MESSAGES'],
    bPerms: ['MANAGE_MESSAGES'],
    usable: true,
    enabled: true
};