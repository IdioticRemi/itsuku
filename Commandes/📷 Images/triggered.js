exports.run = async (client, message, args, utils, locale) => {
    let image = message.mentions.users.first() ? message.mentions.users.first().avatarURL : message.author.avatarURL;

    message.channel.send({
        file: {
            attachment: `https://cute-api.tk/v1/generate/triggered?url=${image}`,
            name: "triggered.gif"
        }
    })
}

exports.config = {
    name: 'Triggered',
    description: 'Faire la photo de prfile de qqn en triggered',
    usage: 'triggered [@user]',
    category: 'Images',
    cool: 30000,
    aliases: ['trigger', 't'],
    uPerms: [],
    bPerms: ['ATTACH_FILES'],
    usable: true,
    enabled: true
};