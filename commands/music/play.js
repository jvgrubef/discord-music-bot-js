const { QueryType, useMainPlayer }     = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');
const urlParser                        = require("js-video-url-parser/lib/base");
const { YouTubeParseResult }           = require('js-video-url-parser/lib/provider/youtube');

module.exports = {
    name: 'play',
    description: "Toque uma música.",
    voiceChannel: true,
    options: [{
        name: 'song',
        description: 'Nome ou link música que você quer tocar',
        type: ApplicationCommandOptionType.String,
        required: true,
    }],

    async execute({ inter, client }) {
        const player = useMainPlayer()
        const song   = inter.options.getString('song');

        const urlSongTarget = () => {

            const testYotube = urlParser.parse(song);

            if(testYotube?.provider !== 'youtube') return song;
            if(!['playlist', 'video'].includes(testYotube.mediaType)) return song;

            const parsed = {
                playlist: `playlist?list=${testYotube.list}`,
                video: `watch?v=${testYotube.id}`
            }

            return `https://www.youtube.com/${parsed[testYotube.mediaType]}`;
        };
        
        const res = await player.search(urlSongTarget(), {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) inter.editReply({ content: `Nenhum resultado encontrado.`, ephemeral: true });

        const queue = await player.nodes.create(inter.guild, {
            metadata:             inter.channel,
            spotifyBridge:        client.config.opt.spotifyBridge,
            volume:               client.config.opt.volume,
            leaveOnEmpty:         client.config.opt.leaveOnEmpty,
            leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
            leaveOnEnd:           client.config.opt.leaveOnEnd,
            leaveOnEndCooldown:   client.config.opt.leaveOnEndCooldown,
        });

        try{
            if(!queue.connection){ 
                await queue.connect(inter.member.voice.channel);
            };
        }catch{
            await player.deleteQueue(inter.guildId);
            return inter.editReply({ content: `Não consigo entrar no canal de voz.`, ephemeral: true });
        };

        try{
            await inter.editReply({ content: `Carregando sua ${res.playlist ? 'playlist' : 'música'} para a fila.`, ephemeral: true });
            
            res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

            if(!queue.isPlaying()){
                await queue.node.play();
            };
	    }catch (error){
	        console.log(error);
	        await inter.editReply({ content: `Esta música possui restrições e não pode ser tocada.`, ephemeral: true });
	    }
    }
};
