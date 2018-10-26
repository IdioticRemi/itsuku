var fs = require('fs-nextra');
var chalk = require('chalk');
var moment = require('moment');
moment.locale('fr');

module.exports = async (client) => {
    client.initSettings = async function (id) {
        var defaults = require('../Utilitaires/default.js');

        client.settings.set(id, defaults);
    }

    client.initUser = async function (usr) {
        var newUser = require('../Utilitaires/user.js');

        newUser.id = usr.id;
        newUser.user = usr.username;

        client.userlist.set(usr.id, newUser);
    }

    client.initExp = (message) => {
        client.userlist.get(message.author.id).scores.push({
            id: message.author.id,
            guild: message.guild.id,

            exp: 0,
            level: 0,
            last: 0
        });

        client.userlist.set(message.author.id, client.userlist.get(message.author.id));
    }

    client.initCustoms = (id) => {
        let settings = {
            guild: id,
            cmds: []
        }

        client.customs.set(id, settings);
    }

    client.getProfile = async function (id) {
        let pr = client.userlist.get(id);
        let def = require('../Utilitaires/user.js');

        let final = {};

        Object.keys(def).forEach((key) => {
            final[key] = pr[key] ? pr[key] : def[key];
        });

        return final;
    }

    client.getSettings = async function (id) {
        let se = client.settings.get(id);
        let def = require('../Utilitaires/default.js');

        let final = {};

        Object.keys(def).forEach((key) => {
            final[key] = se[key] ? se[key] : def[key];
        });
        
        return final;
    }

    client.isCooldown = async function (message, cmd) {
        let user = client.userlist.get(message.author.id);
        let cool = false;
        user.cooldowns.forEach(c => {
            if (cool == true) return;
            if (c.name == cmd.config.name) {
                let co = (c.last + (cmd.config.cool ? (user.premium == true ? (cmd.config.cool / 2) : cmd.config.cool) : (user.premium == true ? 2500 : 5000))) - message.createdTimestamp;
                if (co >= 0) {
                    let rest = moment.duration(co).format('H [h], m [min] [et] s [sec]');
                    message.channel.send(`\\❌ | Veuillez attendre **${rest}** avant de refaire cette commande !`).then(msg => {
                        if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) message.delete(100);
                        msg.delete(5000).catch(err => {
                            return cool = true;
                        });
                    });
                    return cool = true;
                } else {
                    user.cooldowns.filter(coo => coo.name == c.name)[0].last = 0;
                    client.userlist.set(message.author.id, user);
                    return cool = false;
                }
            }
        });
        return cool;
    }

    client.uHasPerms = async function (message, id, cmd) {
        let ret = false;
        if (cmd.config.uPerms.includes('OWNER') && id != '350710888812249101') {
            message.channel.send(`\\❌ | Seul **mon créateur** peut exécuter **cette commande** !`);
            ret = true;
        } else {
            cmd.config.uPerms.forEach(perm => {
                if (ret == true) return;
                if (perm == 'OWNER') return;
                if (!message.channel.permissionsFor(message.author.id).has(perm)) {
                    if (cmd.config.bPerms.length == 1) {
                        message.channel.send(`\\❌ | Vous n'avez pas la permission nécessaire : **${cmd.config.uPerms.join('**, **')}**`);
                        if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) message.delete(100);
                        return ret = true;
                    } else {
                        message.channel.send(`\\❌ | Vous n'avez pas toutes les permissions nécessaires : **${cmd.config.uPerms.join('**, **')}**`);
                        if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) message.delete(100);
                        return ret = true;
                    }
                }
            });
        }
        return ret;
    }

    client.bHasPerms = async function (message, id, cmd) {
        let ret = false;
        cmd.config.bPerms.forEach(perm => {
            if (ret == true) return;
            if (!message.channel.permissionsFor(client.user.id).has(perm)) {
                if (cmd.config.bPerms.length == 1) {
                    message.channel.send(`\\❌ | Je n'ai pas la permission requise : **${cmd.config.bPerms.join('**, **')}**`);
                    return ret = true;
                } else {
                    message.channel.send(`\\❌ | Je n'ai pas toutes les permissions requises : **${cmd.config.bPerms.join('**, **')}**`);
                    return ret = true;
                }
            }
        });
        return ret;
    }

    client.expMonitor = (message) => {
        if (client.settings.get(message.guild.id).exp == false) return;
        if (message.guild.id === '264445053596991498') return;

        let user = client.userlist.get(message.author.id);
        let score = user.scores.filter(s => s.guild == message.guild.id)[0];

        if (!score) return;

        if (score.last + 7500 >= message.createdTimestamp) return;
        else score.last = message.createdTimestamp;

        let toAdd = Math.floor(Math.random() * (12 - 5 + 1)) + 3;

        if (user.premium == true) toAdd = Math.floor(toAdd * 1.5);

        score.exp = score.exp + toAdd;

        let level = Math.floor(Math.sqrt(score.exp / 35));

        if (score.level < level) {
            message.channel.send(client.settings.get(message.guild.id).levelup.replace(/\|USER\|/, message.author.username).replace(/\|@USER\|/, message.author).replace(/\|LEVEL\|/, level).replace(/\|MONEY\|/, level * 5));
            user.money = user.money + level * 5;
            score.level = level;
        }

        user.scores.filter(s => s.guild == message.guild.id)[0] = score;

        client.userlist.set(message.author.id, user);
    };

    client.rEco = async function (id) {
        let m = client.userlist.get(id);
        m.money = m.money + Math.floor(Math.random() * 3);
        client.userlist.set(id, m);
    }


    client.InitItsuku = async function () {
        var locales = await fs.readdir("./Langues/");

        locales.forEach(locale => {
            try {
                var localeName = locale.split(".")[0];
                var file = require(`../Langues/${locale}`);

                client.locales.set(localeName, file);
            } catch (e) {
                console.log(chalk.red('Error :\n\n' + e.stack))
            }
        });

        var event_files = await fs.readdir("./Evenements/");

        event_files.forEach(evt => {
            try {
                var eventName = evt.split(".")[0];
                var event = require(`../Evenements/${evt}`);
                client.on(eventName, event.bind(null, client));
                delete require.cache[require.resolve(`../Evenements/${evt}`)];
            } catch (e) {
                console.log(chalk.red('Error :\n\n' + e.stack))
            };
        });

        var cmd_folders = await fs.readdir(`././Commandes/`);

        cmd_folders.forEach(async (cmd_folder) => {
            var commands = await fs.readdir(`././Commandes/${cmd_folder}`);
            console.log(chalk.yellow(`Chargement de ${commands.length} commandes dans la catégorie ${cmd_folder}.`));

            commands.forEach(command => {
                if (!command.endsWith(`.js`)) return;
                client.loadCommand(cmd_folder, command);
            })

            console.log(``);
        })

        client.login(client.config.TOKEN);
    }

    client.loadCommand = async function (cmd_folder, command) {
        try {
            var cmd = require(`../Commandes/${cmd_folder}/${command}`);
            if (!cmd.config.enabled) return console.log(chalk.red(`./${cmd_folder}/${command} : ✖`));
            if (cmd.init) {
                cmd.init(client);
            }
            client.commands.set(cmd.config.name.toLowerCase(), cmd);
            cmd.config.aliases.forEach(async (aliase) => {
                client.aliases.set(aliase, cmd.config.name.toLowerCase());
            })
            if (!cmd.config.usable) {
                console.log(chalk.cyan(`./${cmd_folder}/${command} : ✔`));
            } else {
                console.log(chalk.green(`./${cmd_folder}/${command} : ✔`));
            }
        } catch (error) {
            return console.log(chalk.red(`./${cmd_folder}/${command} : ✖ \n${error.stack}`));
        }
    }

    process.on('unhandledRejection', error => console.log(chalk.yellow(`${error.stack}`)))
        .on('uncaughtException', error => {
            console.log(chalk.red(`${error.stack}`));
            process.exit();
        })
        .on('error', error => {
            console.log(chalk.yellow(`${error.stack}`))
        })
        .on('warn', error => {
            console.log(chalk.yellow(`${error.stack}`))
        });
}