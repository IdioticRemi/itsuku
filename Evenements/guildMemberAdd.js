module.exports = async (client, member) => {
    let settings = await client.getSettings(member.guild.id);
    let welcome = member.guild.channels.get(settings.welcome);
    let join = settings.join;

    if (join) {
        if (welcome && welcome.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
            join = join.replace(/\|USER\|/g, `${member.user.username}`).replace(/\|COUNT\|/g, `${member.guild.memberCount}`).replace(/\|GUILD\|/g, `${member.guild.name}`).replace(/\|@USER\|/g, `${member.user}`);
            welcome.send(join);
        }
    }

    if (!settings.autorole) return;

    if (!member.guild.roles.get(settings.autorole)) {
        if (welcome && welcome.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
            welcome.send(`\\❌ | **Le role de bienvenue n'existe plus**, vous pouvez le redéfinir avec la commande : **i!autorole set @role**`);
            settings.autorole = undefined;
            return client.settings.set(member.guild.id, settings);
        } else return;
    } else {
        return member.addRole(member.guild.roles.get(settings.autorole)).catch(e => {
            if (welcome && welcome.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
                return welcome.send(`\\❌ | Je n'ai pas toutes les permissions requises  : **MANAGE_ROLES**,**MANAGE_ROLES_AND_PERMISSIONS**`);
            } else return e = '';
        });
    }
};