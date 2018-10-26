module.exports = async (client, member) => {
    let settings = await client.getSettings(member.guild.id);
    let welcome = member.guild.channels.get(settings.welcome);
    let leave = settings.leave;
    
    if (leave) {
        if (welcome && welcome.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
            leave = leave.replace(/\|USER\|/g, `${member.user.username}`).replace(/\|COUNT\|/g, `${member.guild.memberCount}`).replace(/\|GUILD\|/g, `${member.guild.name}`).replace(/\|@USER\|/g, `${member.guild.name}`);
            welcome.send(leave);
        }
    }
};