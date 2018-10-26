exports.run = async (client, message, args, utils, locale) => {
    let image = message.mentions.users.first() ? message.mentions.users.first().avatarURL : message.author.avatarURL;

    message.channel.send({
        file: {
            attachment: `https://api.takohell.com/v1/generate/triggered?url=https://cute-api.tk/v1/generate/invert?url=${image}`,
            name: "triggered.gif"
        }
    })
}

exports.config = {
    name: 'NegaTriggered',
    description: 'Faire la photo de prfile de qqn en triggered négatif',
    usage: 'negatriggered [@user]',
    category: 'Images',
    cool: 30000,
    aliases: ['negatrigger', 'nt'],
    uPerms: [],
    bPerms: ['ATTACH_FILES'],
    usable: true,
    enabled: true
};