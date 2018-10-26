exports.run = async (client, message, args, utils, locale) => {
    message.channel.send(`<:dice1:431162940398239755> ${locale.FUN.DICE} **${Math.floor(Math.random() * (6 - 1 + 1)) + 1}** !`);
}

exports.config = {
    name: 'Dice',
    description: 'Obtenir un chiffre entre 1 et 6',
    usage: 'dice',
    category: 'Fun',
    cool: 10000,
    aliases: ['roll', 'diceroll', 'rolldice'],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};