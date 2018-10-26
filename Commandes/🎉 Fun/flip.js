exports.run = async (client, message, args, utils, locale) => {
    message.channel.send(`<:coins:431163220477345792> ${locale.FUN.FLIP} **${(Math.round(Math.random() * 1)) == 0 ? 'face' : 'pile'}** !`);
}

exports.config = {
    name: 'Flip',
    description: 'Lancer une pièce et voir si elle a atéri sur pile ou face',
    usage: 'flip',
    category: 'Fun',
    cool: 10000,
    aliases: ['coin', 'flipcoin', 'coinflip'],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};