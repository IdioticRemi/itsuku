var Discord = require('discord.js');
var math = require('math-expression-evaluator');

exports.run = async function (client, message, args, utils, locale) {
    if (!args[0]) {
        return message.channel.send(`\\❌ | ${locale.UTILITAIRES.CALC.a}`);
    }

    let embed = new Discord.RichEmbed()
        .setColor('#2277ff');

    let result;
    try {
        result = math.eval(args.join(' '));
    } catch (e) {
        result = locale.UTILITAIRES.CALC.b;
    }

    embed.addField(locale.UTILITAIRES.CALC.c, `\`\`\`js\n${args.join(' ')}\`\`\``).addField(locale.UTILITAIRES.CALC.d, `\`\`\`js\n${result}\`\`\``);

    message.channel.send(embed);
}

exports.config = {
    name: 'Calc',
    description: 'Calculer une expression méthématique',
    usage: 'calc <calcul>',
    category: 'Utilitaires',
    cool: 5000,
    aliases: ['math', 'calcul', 'calculate'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};