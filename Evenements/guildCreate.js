module.exports = (client, guild) => {
    try {
        client.initSettings(guild.id);
    } catch (e) {
        console.log(e.stack);
    }
};