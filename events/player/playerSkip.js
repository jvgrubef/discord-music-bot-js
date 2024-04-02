const { EmbedBuilder } = require('discord.js');

module.exports = (queue, track) => {
    const playerSkip = new EmbedBuilder()
        .setAuthor({name: `Pulando ${track.title} devido a um problema.`, iconURL: track.thumbnail})
        .setColor('#e76894')

    queue.metadata.send({ embeds: [playerSkip] })
};
