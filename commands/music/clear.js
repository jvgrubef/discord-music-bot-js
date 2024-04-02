const { useQueue } = require('discord-player');

module.exports = {
    name: 'clear',
    description: 'Limpe todas as músicas da playlist.',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if(!queue || !queue.isPlaying()){
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        if(!queue.tracks.toArray()[1]){ 
            return inter.editReply({ content: `Não há mais músicas na fila após a atual.`, ephemeral: true });
        };

        await queue.tracks.clear();        
        inter.editReply({ content: `Playlist limpa` });
    }
};
