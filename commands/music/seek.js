const ms                               = require('ms');
const { ApplicationCommandOptionType } = require('discord.js');
const { useQueue }                     = require('discord-player');

module.exports = {
    name: 'seek',
    description: 'Avance ou retroceda em uma música.',
    voiceChannel: true,
    options: [{
        name: 'time',
        description: 'Tempo para o qual você deseja pular.',
        type: ApplicationCommandOptionType.String,
        required: true,
    }],
    
    async execute({ inter }) {
        const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()){
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.currentTrack.durationMS){
            return inter.editReply({ content:`O tempo indicado é maior do que o tempo total da música atual, TENTE, por exemplo, um tempo válido como 5s, 10s, 1m...`, ephemeral: true });
        };

        await queue.node.seek(timeToMS);
        inter.editReply({ content: `Tempo definido na música atual: **${ms(timeToMS, { long: true })}**` });
    }
};
