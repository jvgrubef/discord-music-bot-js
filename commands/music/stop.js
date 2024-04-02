const { useQueue } = require('discord-player');

module.exports = {
    name: 'stop',
    description: 'Pare a música',
    voiceChannel: true,

    execute({ inter }) {
        const queue = useQueue(inter.guild);

        if(!queue || !queue.isPlaying()){
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        queue.delete();
        return inter.editReply({ content: `A música parou.` });
    }
};
