var {
    RichEmbed
} = require('discord.js');

exports.run = async (client, message, args, utils, locale) => {
    if (!args[0]) return message.channel.send(`\\❌ | Veuillez entrer un élément à rechercher sur Google`);
    client.search(args.join(' '), message.channel && message.channel.nsfw).then(({
        card,
        results
    }) => {
        if (card) {
            message.channel.send(card);
        } else if (results.length) {
            let links = results.map((r) => r.link);
            let names = results.map((r) => r.text);

            let embed = new RichEmbed()
                .setColor('#2277ff')
                .addField('1er résultat', `\\📰 Nom : \`${names[0]}\`\n\\🔗 Lien : ${links[0]}`)
                .addField('2ème résultat', `\\📰 Nom : \`${names[1]}\`\n\\🔗 Lien : ${links[1]}`)
                .addField('3ème résultat', `\\📰 Nom : \`${names[2]}\`\n\\🔗 Lien : ${links[2]}`);
            message.channel.send(embed);
        } else {
            message.channel.send('\\❌ | Aucun résultat trouvé sur google ...');
        }
    });
}

exports.config = {
    name: 'Google',
    description: 'Rechercher quelque chose sur google',
    usage: 'google <recherche>',
    category: 'Utilitaires',
    cool: 20000,
    aliases: ['search', 'g'],
    uPerms: [],
    bPerms: [],
    usable: false,
    enabled: true
};