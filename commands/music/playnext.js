const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer, useQueue }         = require('discord-player');
const urlParser                                      = require("js-video-url-parser/lib/base");
const { YouTubeParseResult }                         = require('js-video-url-parser/lib/provider/youtube');

module.exports = {
    name: 'playnext',
    description: "A música que você deseja tocar em seguida.",
    voiceChannel: true,
    options: [{
        name: 'song',
        description: 'A música que você deseja tocar em seguida.',
        type: ApplicationCommandOptionType.String,
        required: true
    }],

    async execute({ inter }) {
        const player = useMainPlayer()
        const queue  = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()){
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        const song = inter.options.getString('song');
        const urlSongTarget = () => {

            const testYotube = urlParser.parse(song);

            if(testYotube?.provider !== 'youtube') return song;
            if(!['playlist', 'video'].includes(testYotube.mediaType)) return song;

            const parsed = {
                playlist: `playlist?list=${testYotube.list}`,
                video: `watch?v=${testYotube.id}`
            };
            
            return `https://www.youtube.com/${parsed[testYotube.mediaType]}`;
        };
        
        const res = await player.search(urlSongTarget(), {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if(!res || !res.tracks.length){
            return inter.editReply({ content: `Nenhum resultado encontrado.`, ephemeral: true });
        };

        if(res.playlist){ 
            return inter.editReply({ content: `Este comando não suporta listas de reprodução.`, ephemeral: true });
        };

        queue.insertTrack(res.tracks[0], 0)
        const PlayNextEmbed = new EmbedBuilder()
            .setAuthor({name: `A faixa foi inserida na fila, ela será a próxima a tocar.`})
            .setColor('#2f3136')
        
        await inter.editReply({ embeds: [PlayNextEmbed] });
    }
};