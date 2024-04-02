const { EmbedBuilder } = require("discord.js");
const { useQueue }     = require('discord-player');

module.exports = {
    name: 'save',
    description: 'Salve a música atual no PV.',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);

        if(!queue){
            return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
        };

        inter.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(`#e76894`)
                    .setTitle(`Informações da Música`)
                    .setURL(`${queue.currentTrack.url}`)
                    .setThumbnail(`${queue.currentTrack.thumbnail}`)
                    .addFields(                      
                        { name: `Música`,        value: `${queue.currentTrack.title}`,    inline: true  },
                        { name: `Autor`,         value: `${queue.currentTrack.author}`,   inline: true  },
                        { name: `Duração`,       value: `${queue.currentTrack.duration}`, inline: true  },
                        { name: 'Link',          value: `${queue.currentTrack.url}`,      inline: false }
                    )
                    .setFooter({text: `Do grupo ${inter.member.guild.name}`, iconURL: 'https://sakura.servegame.com/assets/images/favicon.png'})
            ]
        }).then(() => {
            return inter.editReply({ content: `Te enviei o título da música por mensagem privada.`, ephemeral: true });
        }).catch(error => {
            console.log(error);
            return inter.editReply({ content: `Não consegui te enviar no privado, deve estar bloqueado.`, ephemeral: true });
        });
    }
};
