const { useQueue } = require('discord-player');

module.exports = {
    name: 'pause',
    description: 'Pausar a música',
    voiceChannel: true,

    execute({ inter }) {
        const queue = useQueue(inter.guild);

        if(!queue){
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        if(queue.node.isPaused()){
            return inter.editReply({content: `A música já está pausada.`, ephemeral: true})
        };

        const success = queue.node.setPaused(true);
        return inter.editReply({ content: success ? `A música **${queue.currentTrack.title}** foi pausada.` : `Algo deu errado.` });
    }
};
