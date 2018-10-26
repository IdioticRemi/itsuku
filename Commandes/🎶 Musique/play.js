var ytdl = require('ytdl-core');
var Youtube = require('simple-youtube-api');
var {
    RichEmbed
} = require('discord.js');

exports.run = async function (client, message, args, utils, locale, queue) {
    if (!args[0]) return message.channel.send(`\\❌ | ${locale.MUSIQUE.PLAY.a}`);

    let voiceChannel = message.member.voiceChannel;

    if (!voiceChannel) return message.channel.send(`\\❌ | ${locale.MUSIQUE.PLAY.b}`);

    let permissions = voiceChannel.permissionsFor(client.user);

    if (!permissions.has('CONNECT')) return message.channel.send(`\\❌ | ${locale.MUSIQUE.PLAY.c}`);
    if (!permissions.has('SPEAK')) return message.channel.send(`\\❌ | ${locale.MUSIQUE.PLAY.d}`);

    var youtube = new Youtube(client.config.GOOGLE_API_KEY);
    let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        let playlist = await youtube.getPlaylist(url);
        let videos = await playlist.getVideos();
        for (var video of Object.values(videos)) {
            if (!video) return;
            let vid = await youtube.getVideoByID(video.id).catch(e => {
                return
            })
            await utils.handleVideo(client, message, vid, voiceChannel, queue, locale, true);
        }
        message.channel.send(`🎶 ${locale.MUSIQUE.PLAY.e} **${playlist.title.replace(/\*/g, '\\*')}** ${locale.MUSIQUE.PLAY.f}`);
    } else {
        try {
            var video = await youtube.getVideo(url);
            await utils.handleVideo(client, message, video, voiceChannel, queue, locale);
        } catch (e) {
            try {
                let serverQueue = queue.get(message.guild.id);
                let searched = args.join(' ');
                var videos = await youtube.searchVideos(searched, 10);
                let i3 = 0;
                let channel = message.channel;
                let embed = new RichEmbed()
                .setColor('#2277ff')
                .setTitle(locale.MUSIQUE.PLAY.g)
                .setDescription(videos.map(vid => `🔸 **${++i3}** : ${vid.title}`).join('\n'));
                let msg1;
                channel.send(embed).then(
                    msg => {
                        msg1 = msg;
                    }
                )
                try {
                    var response = await channel.awaitMessages(msg => msg.content > 0 && msg.content < 11 && !isNaN(msg.content), {
                        maxMatches: 1,
                        time: 10000,
                        errors: ['time']
                    });
                    msg1.delete(300).catch(e => e = '');

                } catch (err) {
                    msg1.delete(300).catch(e => e = '');
                    return message.channel.send(locale.MUSIQUE.PLAY.h);
                }
                let videoIndex = parseInt(response.first().content);
                let video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                await utils.handleVideo(client, message, video, voiceChannel, queue, locale);
                if (message.channel.permissionsFor(client.user).has('MANAGE_MESSAGES')) return response.first().delete(300);
            } catch (er) {
                return message.channel.send(`\\❌ | ${locale.MUSIQUE.PLAY.i} **${searched.replace(/\*/g, '\\*')}**`);
            }
        }
    }
}

exports.config = {
    name: 'Play',
    description: 'Jouer de la musique dans votre channel vocal !',
    usage: 'play <playlist|url|titre>',
    category: 'Musique',
    cool: 5000,
    aliases: ['pl', 'youtube', 'yt'],
    uPerms: [],
    bPerms: ['CONNECT', 'SPEAK'],
    usable: true,
    enabled: true
};