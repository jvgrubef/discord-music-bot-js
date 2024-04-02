const { EmbedBuilder } = require('discord.js');
module.exports = (queue, track) => {

    if (!client.config.app.loopMessage && queue.repeatMode !== 0) return;
 
    const embed = new EmbedBuilder()
        .setColor(`#e76894`)
        .setTitle(`Tocando agora`)
        .setURL(`${queue.currentTrack.url}`)
        .setThumbnail(`${queue.currentTrack.thumbnail}`)
        .addFields([
            { name: `Musica`,     value: `${track.title}`,       inline: true  },
            { name: `Autor`,      value: `${track.author}`,      inline: true  },
            { name: `Duração`,    value: `${track.duration}`,    inline: true  },
            { name: `Pedido por`, value: `${track.requestedBy}`, inline: true  }
        ])
        .setFooter({ text: `Sakura Server`, iconURL: `https://sakura.servegame.com/assets/images/favicon.png` })
        .setTimestamp();
        
    queue.metadata.send({ embeds: [embed] })
};