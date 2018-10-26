exports.run = async function (client, message, args, utils, locale) {
    if (message.author.id !== '350710888812249101') return;

    try {
        client.customs.deleteAll();

        message.channel.send(`All the values have been deleted ! (Customs reset)`);
    } catch (e) {
        message.channel.send(`Error while deleting all the values : \`${e}\` !`);
    }
}

exports.config = {
    name: 'cReset',
    description: '/!\\ Supprimer toutes les valeurs de la BDD (Customs) /!\\',
    usage: 'creset',
    category: '',
    aliases: [],
    uPerms: ['OWNER'],
    bPerms: [],
    usable: true,
    enabled: true
};