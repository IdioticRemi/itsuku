var { exec } = require('child_process');

exports.run = async (client, message, args, utils, locale) => {
    if (message.author.id !== '350710888812249101') return;

    exec(`${args.join(' ')}`, (error, stdout) => {
        var response = (error || stdout);
        if (!error) message.channel.send(`\\✅ | L'execution s'est terminée sans problêmes :`);
        else message.channel.send(`\\❌ | Une erreur est survenue lors de l'exécution :`);
        message.channel.send(`${response}`, {
            code: "js",
            split: "\n"
        }).catch(e => console.log(e));
    });
}

exports.config = {
    name: 'Exec',
    description: 'Executer une commande sur la machine',
    usage: 'exec <...commande>',
    category: '',
    aliases: ['exe', 'ssh'],
    uPerms: ['OWNER'],
    bPerms: [],
    usable: true,
    enabled: true
};