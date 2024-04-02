const { EmbedBuilder } = require('discord.js');
const { useQueue }     = require('discord-player');

module.exports = {
    name: 'history',
    description: 'Ver o histórico da fila.',
    voiceChannel: false,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);

        if(!queue || queue.history.tracks.toArray().length == 0){
            return inter.editReply({ content: `Nenhuma música foi tocada ainda.`, ephemeral: true });
        };

        const tracks = queue.history.tracks.toArray();

        let description = tracks
            .slice(0, 20)
            .map((track, index) => { return `**${index + 1}.** [${track.title}](${track.url}) por ${track.author}` })
            .join('\r\n\r\n');

        let HistoryEmbed = new EmbedBuilder()
            .setTitle(`História`)
            .setDescription(description)
            .setColor('#2f3136')
            .setTimestamp()
            .setFooter({ text: 'Sakura Server', iconURL: 'https://sakura.servegame.com/assets/images/favicon.png'});

        inter.editReply({ embeds: [HistoryEmbed] });
    }
};