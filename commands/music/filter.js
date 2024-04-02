const { ApplicationCommandOptionType } = require('discord.js');
const { useQueue }                     = require('discord-player');

module.exports = {
    name: 'filter',
    description: 'Adicione um filtro à sua música.',
    voiceChannel: true,
    options: [
        {
            name: 'filter',
            description: 'Filtro que você deseja adicionar.',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(require("discord-player").AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],

    async execute({ inter }) {
        const queue = useQueue(inter.guild);

        if(!queue || !queue.isPlaying()){
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        const actualFilter = queue.filters.ffmpeg.getFiltersEnabled()[0];
        const infilter     = inter.options.getString('filter');
        const filters      = [];

        queue.filters.ffmpeg.getFiltersEnabled().map(x => filters.push(x));
        queue.filters.ffmpeg.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === infilter.toLowerCase().toString());

        if(!filter){
            return inter.editReply({ content: `Esse filtro não existe.\n${actualFilter ? `Filtro atualmente ativo: ${actualFilter}.\n` : ''}Lista de filtros disponíveis: ${filters.map(x => `${x}`).join(', ')}.`, ephemeral: true });
        };

        await queue.filters.ffmpeg.toggle(filter)
        return inter.editReply({ content: `O filtro ${filter} agora está ${queue.filters.ffmpeg.isEnabled(filter) ? 'ativado' : 'desativado'}\nLembre-se de que quanto mais longa a música, mais tempo levará para aplicar o filtro.` });
    }
};
