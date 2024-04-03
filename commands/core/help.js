const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'help',
    description: "Todos os comandos que eu possuo!",
    showHelp: false,

    execute({ client, inter }) {

        const commands = client.commands.filter(x => x.showHelp !== false).map(x => `/**${x.name}** - ${x.description}`).join('\n');
        const embed = new EmbedBuilder()
            .setColor('#e76894')
            .setAuthor({ name: 'Lista de comandos com a barra', iconURL: 'https://sakura.servegame.com/assets/images/favicon.png' })
            .setDescription(commands)
            .setTimestamp()
            .setFooter({ text: 'Sakura Server', iconURL: 'https://sakura.servegame.com/assets/images/favicon.png'});

        inter.editReply({ embeds: [embed] });
    }
};
