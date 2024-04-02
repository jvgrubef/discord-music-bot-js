const { useQueue } = require('discord-player');

module.exports = {
    name: 'skip',
    description: 'Pule a música que está tocando.',
    voiceChannel: true,

    execute({ inter }) {
        const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()){
            return inter.editReply({ content:`No momento, não há música tocando.`, ephemeral: true });
        };

        const success = queue.node.skip();
        return inter.editReply({ content: success ? `A música "${queue.currentTrack.title}" foi pulada.` : `Algo deu errado.` });
    }
};
