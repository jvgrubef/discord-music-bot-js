const maxVol                           = client.config.opt.maxVol;
const { ApplicationCommandOptionType } = require('discord.js');
const { useQueue  }                    = require('discord-player');

module.exports = {
    name: 'volume',
    description: 'Ajuste do volume.',
    voiceChannel: true,
    options: [{
        name: 'volume',
        description: 'Numero inteiro de 1 a 100.',
        type: ApplicationCommandOptionType.Number,
        required: true,
        minValue: 1,
        maxValue: maxVol
    }],
    
    execute({ inter }) {
        const queue = useQueue(inter.guild);

        if(!queue){
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        const vol = inter.options.getNumber('volume');

        if(queue.node.volume === vol){
            return inter.editReply({ content: `O volume que você deseja alterar já é o atual`, ephemeral: true });
        };

        const success = queue.node.setVolume(vol);

        return inter.editReply({ content: success ? `O volume foi modificado para ${vol}/${maxVol}%` : `Algo deu errado.` });
    }
};
