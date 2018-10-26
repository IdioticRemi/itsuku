exports.run = async function (client, message, args, utils, locale) {
    if (!args[0] || !args[1] | !args[2] || isNaN(args[2])) return message.channel.send(`You need to provide the action (**+/-**), a **@user/id** and **an amount** !`);

    let id = message.mentions.users.first() ? message.mentions.users.first().id : args[1];
    let amount = parseInt(args[2]);

    if (args[0] == '+') {
        if (!client.userlist.get(id)) return message.channel.send('User provided cannot be found !');

        client.userlist.setProp(id, 'money', client.userlist.getProp(id, 'money') + amount, true);

        message.channel.send('Successfully updated ' + client.userlist.getProp(id, 'user') + '\'s money !');
    } else if (args[0] == '-') {
        if (!client.userlist.get(id)) return message.channel.send('User provided cannot be found !');

        client.userlist.setProp(id, 'money', client.userlist.getProp(id, 'money') - amount, true);

        message.channel.send('Successfully updated ' + client.userlist.getProp(id, 'user') + '\'s money !');
    } else return message.channel.send(`Invalid action type ! Actions : **+ / -**`);
}

exports.config = {
    name: 'Credit',
    description: 'Ajouter ou Enlever de la monaie à quelqu\'un !',
    usage: 'credit <+|-> <@user|id>',
    category: '',
    cool: 0,
    aliases: ['givemoney', 'moneygive', 'mgive', 'givem'],
    uPerms: ['OWNER'],
    bPerms: [],
    usable: true,
    enabled: true
};