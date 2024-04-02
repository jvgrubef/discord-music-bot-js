const { ApplicationCommandOptionType } = require('discord.js');
const { useQueue }                     = require('discord-player');

module.exports = {
    name: 'remove',
    description: "Remover uma música da playlist.",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'O nome ou url da faixa que você deseja remover.',
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

    async execute({ inter }){

        const number = inter.options.getNumber('number')
        const track  = inter.options.getString('song');
        const queue  = useQueue(inter.guild);

        if(!queue || !queue.isPlaying()){
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        if(!track && !number){
            inter.editReply({ content: `Você tem que usar uma das opções para remover uma música.`, ephemeral: true });
        };

        if(track){
            const track_to_remove = queue.tracks.toArray().find((t) => t.title === track || t.url === track);
            
            if(!track_to_remove){
                return inter.editReply({ content: `Esta música parece não estar na playlist.`, ephemeral: true });
            };
            
            queue.removeTrack(track_to_remove);
            return inter.editReply({ content: `A música ${track_to_remove} foi removida da playlist.` });
        };

        if(number){
            const index     = number - 1
            const trackname = queue.tracks.toArray()[index].title

            if(!trackname){ 
                return inter.editReply({ content: `Esta música parece não estar na playlist.`, ephemeral: true });   
            };

            queue.removeTrack(index);
            return inter.editReply({ content: `A música ${trackname} foi removida da playlist.` });
        };
    }
}
