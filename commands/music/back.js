const { useQueue } = require('discord-player');

module.exports = {
    name: 'back',
    description: "Toque a música anterior.",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);

        if(!queue || !queue.node.isPlaying()){ 
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        if(!queue.history.previousTrack){
            return inter.editReply({ content: `Não havia música sendo reproduzida antes.`, ephemeral: true });
        };

        await queue.history.back();

        inter.editReply({ content: `Tocando música anterior.` });
    }
};
