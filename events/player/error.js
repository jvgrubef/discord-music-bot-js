const { EmbedBuilder } = require('discord.js');

module.exports = (queue, error) => {
    const ErrorEmbed = new EmbedBuilder()
        .setAuthor({name: `Econtrei um erro inesperado, por favor, verifique o console.`, iconURL: track.thumbnail})
        .setColor('#EE4B2B');
    
    queue.metadata.send({ embeds: [ErrorEmbed] });
    console.log(`Erro emitido pelo Bot:\n${error.message}`);
}
