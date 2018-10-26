this.noLogs = async function (message) {
    return message.channel.send(`\\❌ | Veuillez définir un channel de logs de modération`);
}
this.noUserOrReason = async function (message) {
    return message.channel.send(`\\❌ | Veuillez entrer un utilisateur et une raison !`);
}
this.noUserOrRole = async function (message) {
    return message.channel.send(`\\❌ | Veuillez entrer un utilisateur et un rôle !`);
}
this.alreadyMuted = async function (message, cible) {
    return message.channel.send(`\\❌ | **${message.guild.member(cible.id).displayName + '#' + cible.discriminator}** est déja mute sur le serveur !`);
}
this.alreadyUnmuted = async function (message, cible) {
    return message.channel.send(`\\❌ | **${message.guild.member(cible.id).displayName + '#' + cible.discriminator}** est déja unmute sur le serveur !`);
}
this.cantBan = async function (message, cible) {
    return message.channel.send(`\\❌ | Tu ne peut pas bannir **${message.guild.member(cible.id).displayName + '#' + cible.discriminator}** !`);
}
this.cantMute = async function (message, cible) {
    return message.channel.send(`\\❌ | Tu ne peut pas mute **${message.guild.member(cible.id).displayName + '#' + cible.discriminator}** !`);
}
this.cantKick = async function (message, cible) {
    return message.channel.send(`\\❌ | Tu ne peut pas expulser **${message.guild.member(cible.id).displayName + '#' + cible.discriminator}** !`);
}
this.cantBan2 = async function (message, cible) {
    return message.channel.send(`\\❌ | Je n'ai pas la permission de bannir **${message.guild.member(cible.id).displayName + '#' + cible.discriminator}** !`);
}
this.cantKick2 = async function (message, cible) {
    return message.channel.send(`\\❌ | Je n'ai pas la permission d'expulser **${message.guild.member(cible.id).displayName + '#' + cible.discriminator}** !`);
}
this.cantWarn = async function (message, cible) {
    return message.channel.send(`\\❌ | Tu ne peut pas warn **${message.guild.member(cible.id).displayName + '#' + cible.discriminator}** !`);
}
this.cantSendLog = async function (message, logchannel) {
    return message.channel.send(`\\❌ | Je n'ai **pas la permission** d'envoyer un message dans ${logchannel} !`);
}
this.log = async function (client, cible, message, reason, type, channel) {
    let Discord = require('discord.js')
    let embed = new Discord.RichEmbed()
        .setColor(type.replace('Warn', '#32ef51').replace('Kick', '#efe832').replace('Ban', '#f44141').replace('Mute', '#2277ff').replace('Unmute', '#2277ff'))
        .setTitle(`${type} | Cas #${client.settings.get(message.guild.id).cases}`)
        .addField('Utilisateur', cible.tag + '(' + cible + ')', true)
        .addField('Modérateur', message.author.tag + '(' + message.author + ')', true)
        .addField('Raison', reason)
        .setTimestamp();

    let settings = client.settings.get(message.guild.id);
    settings.cases = settings.cases + 1;
    client.settings.set(message.guild.id, settings);

    return channel.send(embed);
}
this.handleVideo = async function (client, message, video, voiceChannel, queue, locale, playlist = false) {
    let serverQueue = queue.get(message.guild.id);
    if (!video) return;
    var song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        duration: `${video.duration.hours}:${video.duration.minutes}:${video.duration.seconds}`
    }
    if (!serverQueue) {
        var queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            playing: true
        }
        queueConstruct.songs.push(song);
        queue.set(message.guild.id, queueConstruct);
        try {
            var connection = await voiceChannel.join();
            let serverQueue = queue.get(message.guild.id);
            serverQueue.connection = connection;
            this.play(client, message, serverQueue.songs[0], locale);
        } catch (e) {
            queue.delete(message.guild.id);
            console.log(e.stack);
            return message.channel.send(`\\❌ | ${locale.UTILS.HANDLE.a}`);
        }
    } else {
        serverQueue.songs.push(song);
        if (!playlist) message.channel.send(`🎶 ${locale.UTILS.HANDLE.b} **${song.title.replace(/\*/g, '\\*')}** ${locale.UTILS.HANDLE.c}`);
    }
}
this.play = async function (client, message, song, locale) {
    let serverQueue = client.queue.get(message.guild.id);
    if (!song) {
        client.queue.get(message.guild.id).voiceChannel.leave();
        return client.queue.delete(message.guild.id)
    };
    var ytdl = require('ytdl-core');
    message.channel.send(`🎵 ${locale.UTILS.PLAY.a} **${song.title.replace(/\*/g, '\\*')}** ${locale.UTILS.PLAY.b}`);
    var dispatcher = serverQueue.connection.playStream(ytdl(song.url, {
            audioOnly: true
        }))
        .on('end', (raison) => {
            if (raison == 'Stream is not generating quickly enough.') raison = `🎶 ${locale.UTILS.PLAY.a} **${song.title.replace(/\*/g, '\\*')}** ${locale.UTILS.PLAY.c}`;
            if (!raison) raison = `🎶 ${locale.UTILS.PLAY.a} **${song.title.replace(/\*/g, '\\*')}** ${locale.UTILS.PLAY.c} !`;
            message.channel.send(raison);
            serverQueue.songs.shift();
            this.play(client, message, serverQueue.songs[0], locale);
        })
        .on('error', e => console.log(e.stack));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 2 / 100);
}