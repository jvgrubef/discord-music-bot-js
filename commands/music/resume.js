const { useQueue } = require('discord-player');

module.exports = {
    name: 'resume',
    description: 'Resumir a música.',
    voiceChannel: true,

    execute({ inter }) {
        const queue = useQueue(inter.guild);

        if(!queue){ 
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };
        
        if(queue.node.isPlaying()){
            return inter.editReply({content: `A música já está tocando.`, ephemeral: true})
        };

        const success = queue.node.resume();       
        return inter.editReply({ content: success ? `A música **${queue.currentTrack.title}** foi retomada.` : `Algo deu errado.` });
    }
};
