exports.run = async (client, message, args, utils, locale) => {
    message.channel.send(`Je suis en version : **v${client.infos.version}**`);
}

exports.config = {
    name: 'Version',
    description: 'Voir la version du bot.',
    usage: 'version',
    category: 'Itsuku',
    aliases: ['vers', 'v'],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};