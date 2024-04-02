const { EmbedBuilder } = require('discord.js');
const { useQueue }     = require('discord-player');

module.exports = {
    name: 'now',
    description: 'Veja o que está tocando.',
    voiceChannel: true,

    execute({ inter }) {
        const queue = useQueue(inter.guild);

        if (!queue){
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        const methods = ['Desabilitado', 'Atual', 'Playlist'];
        
        const embed = new EmbedBuilder()
            .setColor(`#e76894`)
            .setTitle(`Tocando agora`)
            .setURL(`${queue.currentTrack.url}`)
            .setThumbnail(`${queue.currentTrack.thumbnail}`)
            .addFields([
                { name: `Musica`,     value: `${queue.currentTrack.title}`,       inline: true  },
                { name: `Autor`,      value: `${queue.currentTrack.author}`,      inline: true  },
                { name: `Duração`,    value: `${queue.currentTrack.duration}`,    inline: true  },
                { name: `Repetição`,  value: `${methods[queue.repeatMode]}`,      inline: true  },
                { name: `Pedido por`, value: `${queue.currentTrack.requestedBy}`, inline: true  }
            ])
            .setFooter({ text: `Sakura Server`, iconURL: `https://sakura.servegame.com/assets/images/favicon.png` })
            .setTimestamp();

        inter.editReply({ embeds: [embed] });
    }
};
