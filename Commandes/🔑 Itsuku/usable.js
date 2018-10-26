exports.run = async function (client, message, args, utils, locale) {
    if (!args[0] || !['true', 'false'].includes(args[0].toLowerCase())) return message.channel.send(`\\❌ | Veuillez entrer un de ces choix : **true | false**`);

    switch (args[0].toLowerCase()) {
        case 'false':
            client.settings.set('Itsuku', {
                usable: false
            });
            message.channel.send(`\\✅ | La maintenance a bien été **lancée** !`);
            break;
        case 'true':
            client.settings.set('Itsuku', {
                usable: true
            });
            message.channel.send(`\\✅ | La maintenance a bien été **arrêtée** !`);
            break;
    }
}

exports.config = {
    name: 'Usable',
    description: 'Lancer ou Arrêter la maintenance du bot',
    usage: 'usable <true|false>',
    category: '',
    aliases: [],
    uPerms: ['OWNER'],
    bPerms: [],
    usable: true,
    enabled: true
};