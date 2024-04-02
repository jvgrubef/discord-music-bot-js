const { ApplicationCommandOptionType } = require('discord.js');
const { useQueue }                     = require('discord-player');

module.exports = {
    name: 'jump',
    description: "Salta para uma faixa específica na fila.",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'O nome ou URL da música para a qual você deseja saltar.',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'O lugar na fila em que a música está.',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const track  = inter.options.getString('song');
        const number = inter.options.getNumber('number')
        const queue  = useQueue(inter.guild);

        if(!queue || !queue.isPlaying()){
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };
        
        if(!track && !number){
            inter.editReply({ content: `Você precisa usar uma das opções para pular para uma música.`, ephemeral: true });
        };

        if(track){
            const track_to_jump = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track)
            
            if(!track_to_jump){
                return inter.editReply({ content: `Esta música parece não estar na playlist, tente usar a URL ou o nome completo da música.`, ephemeral: true });
            };

            queue.node.jump(track_to_jump);
            return inter.editReply({ content: `Pulou para ${track_to_jump.title}.` });
        };
        
        if (number) {
            const index = number - 1
            const trackname = queue.tracks.toArray()[index].title
        
            if (!trackname){ 
                return inter.editReply({ content: `Esta música parece não estar na playlist.`, ephemeral: true });   
            };

            queue.node.jump(index);       
            inter.editReply({ content: `Pulou para música ${trackname}.` });
        };
    }
};
