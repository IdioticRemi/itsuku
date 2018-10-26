module.exports = (client, guild) => {
    try {
        client.settings.delete(guild.id);
    } catch (e) {
        console.log(e.stack);
    }
};