module.exports = client => {
    console.log(require('chalk').white.bgGreen(`${client.user.username} v${client.infos.version} est connecté !\n`));

    setInterval(() => {
        let game;
        let users = 0;
        client.guilds.forEach(g => users = users + g.memberCount)
        setTimeout(() => {
            if (client.user.presence.game && client.user.presence.game.name.includes('Servers')) game = `i!help | ${users} Users | v${client.infos.version}`
            else game = `i!help | ${client.guilds.size} Servers | v${client.infos.version}`
            client.user.setActivity(game, {
                type: "WATCHING"
            });
        }, 2000);
    }, 58000);
}