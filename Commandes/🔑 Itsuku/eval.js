var Discord = require('discord.js');

exports.run = async (client, message, args, utils, locale) => {
    if (message.author.id !== '350710888812249101') return;

    var clean = async function (text) {
        if (typeof evaled !== "string") {
            text = require("util").inspect(text, {
                depth: 0
            });
        }
        text = text.replace(/`/g, "`" + String.fromCharCode(8203));
        text = text.replace(/@/g, "@" + String.fromCharCode(8203));
        text = text.replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");
        return text;
    }

    let embed = new Discord.RichEmbed().setColor('RANDOM');
    let exembed = new Discord.RichEmbed().setColor('RANDOM').setTitle('Ceci est un titre !').setDescription('Ceci est une description :P').addField('Et ca un titre de Field !', 'Toujours accompagné de sa description !').setTimestamp().setFooter("Et ca c'est un pied d'embed :')").setThumbnail(message.author.avatarURL);

    try {
        var code = args.join(" ");
        let evaled = await eval(code);
        evaled = await clean(evaled);
        if (typeof evaled !== "string") {
            evaled = require("util").inspect(evaled);
        }
        message.channel.send(`\\✅ | L'eval s'est terminée sans problêmes :`).then(() => {
            message.channel.send(evaled, {
                code: "js",
                split: "\n"
            });
        })
    } catch (err) {
        message.channel.send(`\\❌ | Une erreur est survenue lors de l'exécution :\`\`\`js\n${err.stack}\n\`\`\``);
    }

}

exports.config = {
    name: 'Eval',
    description: 'Executer du javascript arbitraire',
    usage: 'eval <...code>',
    category: '',
    aliases: ['code'],
    uPerms: ['OWNER'],
    bPerms: [],
    usable: true,
    enabled: true
};