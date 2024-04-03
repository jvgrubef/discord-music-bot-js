const { QueueRepeatMode, useQueue }    = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'Ativar ou desativar a repetição de músicas individuais ou de toda a fila.',
    voiceChannel: true,
    options: [{
        name: 'action' ,
        description: 'Qual modo de repetição você deseja?',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Playlist',    value: 'QUEUE'    },
            { name: 'Desabilitar', value: 'OFF'      },
            { name: 'Música',      value: 'TRACK'    },
            { name: 'autoplay',    value: 'AUTOPLAY' }
        ]
    }],

    execute({ inter }) {
        const queue = useQueue(inter.guild);
        let response;

        if (!queue || !queue.isPlaying()){
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        const selected = inter.options._hoistedOptions.map(x => x.value).toString();

        const repeatResponse = {
                'QUEUE': 'a playlist será repetida.',
                'OFF': 'foi desabilitado.',
                'TRACK': 'a músicas atual será repetida.',
                'AUTOPLAY': 'irei procurar músicas na mesma vibe dessa para tocar.'
        };

        if (queue.repeatMode === QueueRepeatMode[selected]) {
                response = `Modo de repeticao já está nesse estado.`;
        } else {
                response = queue.setRepeatMode(QueueRepeatMode[selected]) ?
                        `Algo deu errado.` : `Modo de repetição alterada, ${repeatResponse[selected]}`;
        }

        return inter.editReply({ content: response });
    }
};
