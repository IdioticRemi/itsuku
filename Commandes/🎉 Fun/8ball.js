exports.run = async (client, message, args, utils, locale) => {
    let answers = (!args[0] || args.length < 2) ? locale.FUN.BALL.a : locale.FUN.BALL.b;

    message.channel.send(`**<:8ball:431163827346997248> __${answers[Math.floor(Math.random() * answers.length)]}__**`);
}

exports.config = {
    name: '8Ball',
    description: 'Posez une question, je vous répondrai',
    usage: '8ball [question]',
    category: 'Fun',
    cool: 10000,
    aliases: ['ask', 'answer'],
    uPerms: [],
    bPerms: [],
    usable: true,
    enabled: true
};