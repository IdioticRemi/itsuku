exports.run = async (client, message, args, utils, locale) => {
    if (message.author.id !== '350710888812249101') return;
    
    message.channel.send(`\\✅ | Le bot va redémarrer dans **5 secondes** !`).then(msg => {
        message.delete(100).then(() => {
            msg.delete(4900).then(() => {
                process.exit();
            })
        })
    });
}

exports.config = {
    name: 'Restart',
    description: 'Redémarrer le bot',
    usage: 'restart',
    category: '',
    aliases: ['reboot'],
    uPerms: ['OWNER'],
    bPerms: [],
    usable: true,
    enabled: true
};