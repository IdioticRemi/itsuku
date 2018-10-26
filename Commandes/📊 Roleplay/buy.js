var Discord = require('discord.js')

exports.run = async function (client, message, args, utils, locale) {
    if (message.guild.id != '430801236606976001') return message.channel.send('\\❌ | Cette commande ne peut être executée que sur le Serveur Officiel');

    var items = [{
        short: 'premium',
        name: 'Premium [Itsuku]',
        desc: '- Cooldowns divisés par **2**\n- Rôle **『• Itsuku\'s Squad •』** sur le Discord Officiel\n- Catégorie **Itsuku\'s Squad** sur le Discord Officiel\n- **+25%** d\'experience !',
        price: 5000
    }]

    let embed = new Discord.RichEmbed().setColor('#2277ff').setDescription(`Voici la liste des objets pouvant êtres achetés ! (**${items.length}** Item(s))`);
    
    items.forEach(i => {
        embed.addField(i.name, `Prix : \`${i.price} ¥\`\nAvantages :\n${i.desc}`)
    });

    if (!args[0]) return message.channel.send(embed);

    if (items.map(i => i.short).includes(args[0].toLowerCase())) {
        let item = items.filter(i => i.short == args[0].toLowerCase())[0];
        let userProfile = await await client.getProfile(message.author.id);

        if (userProfile.money < item.price) return message.channel.send('\\❌ | ' + `${locale.ROLEPLAY.PAY.b.split('(')[0]}`);

        if (item.name == 'Premium [Itsuku]') {
            if (client.userlist.getProp(message.author.id, 'premium') == true) return message.channel.send(`\\❌ | Tu as déja acheté cet objet !`)

            client.userlist.setProp(message.author.id, 'premium', true, true);
            client.userlist.setProp(message.author.id, 'money', (client.userlist.getProp(message.author.id, 'money') - item.price), true);
            let role = message.guild.roles.find('name', '『• Itsuku\'s Squad •』');

            if (message.guild.member(message.author.id).roles.has(role) == false) message.guild.member(message.author.id).addRole(role);

            message.channel.send(`<:premium:441642665671393280> **Félicitations à toi ${message.author} ! Tu as acheté le premium ! Profite-en bien !**`);
        }
    } else {
        return message.channel.send(embed);
    }
}

exports.config = {
    name: 'Buy',
    description: 'Acheter des choses avec la monaie !',
    usage: 'buy <item>',
    category: 'Roleplay',
    cool: 5000,
    aliases: ['purchase'],
    uPerms: [],
    bPerms: ['EMBED_LINKS'],
    usable: true,
    enabled: true
};