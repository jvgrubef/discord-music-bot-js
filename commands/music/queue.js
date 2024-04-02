const { EmbedBuilder } = require('discord.js');
const { useQueue }     = require('discord-player');

module.exports = {
    name: 'queue',
    description: 'Obtenha as músicas na playlist.',
    voiceChannel: true,

    execute({ inter }) {
        const queue = useQueue(inter.guild);

        if(!queue){ 
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        if(!queue.tracks.toArray()[0]){
            return  inter.editReply({ content: `Não há músicas na fila após a atual.`, ephemeral: true });
        };

        const methods = ['Desabilitado', 'Atual', 'Playlist'];
        const tracks = queue.tracks.map((track, i) => ({
            name: `**${i + 1}**.${track.title} ~ ${track.author}`,
            value: `Pedido por: ${track.requestedBy.username}`
        }))
        .slice(0, 5);
        
        if(queue.tracks.size > 5){
            tracks.push({
                name: `E outras..`, value: `**${queue.tracks.size - 5}** músicas a mais.`
            })
        };
        
        const embed = new EmbedBuilder()
            .setColor(`#e76894`)
            .setTitle(`Playlist - ${inter.guild.name}`)
            .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
            .setDescription(`Tocando agora: ${queue.currentTrack.title}`)
            .addFields(tracks)
            .addFields([
                { name: `Repetição`, value: `${methods[queue.repeatMode]}`}
            ])
            .setTimestamp()
            .setFooter({ text: 'Sakura Server', iconURL: `https://sakura.servegame.com/assets/images/favicon.png`})

        inter.editReply({ embeds: [embed] });
    }
};
