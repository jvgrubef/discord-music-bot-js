const { ApplicationCommandOptionType } = require('discord.js');
const { useQueue }                     = require('discord-player');

module.exports = {
    name: 'skipto',
    description: "Pula para uma música específica na playlist.",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'O nome/URL da música para a qual você deseja pular.',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'O lugar na playlist em que a música está.',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) {

        const track  = inter.options.getString('song');
        const number = inter.options.getNumber('number');
        const queue  = useQueue(inter.guild);

        if(!queue || !queue.isPlaying()){
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        if(!track && !number){
            inter.editReply({ content: `Você precisa usar uma das opções para ir para uma música.`, ephemeral: true });
        };

        if (track) {
            const track_skipto = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track);
            
            if(!track_skipto){
                return inter.editReply({ content: `Não foi possível encontrar "${track}", tente usar a URL ou o nome completo da música.`, ephemeral: true });
            };
            
            queue.node.skipTo(track_skipto);
            return inter.editReply({ content: `Pulado para "${track_skipto.title}"` });
        };

        if(number){
            const index     = number - 1
            const trackname = queue.tracks.toArray()[index].title
            
            if(!trackname){
                return inter.editReply({ content: `Esta música parece não existir.`, ephemeral: true });   
            }

            queue.node.skipTo(index);          
            inter.editReply({ content: `Pulado para "${trackname}".` });
        };
    }
};
