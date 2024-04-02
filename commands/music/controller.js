const { 
    EmbedBuilder, 
    ButtonBuilder, 
    ActionRowBuilder, 
    PermissionsBitField,
    ApplicationCommandOptionType
} = require('discord.js');

module.exports = {
    name: 'controller',
    description: "Controle geral do player.",
    voiceChannel: false,
    permissions: PermissionsBitField.Flags.ManageMessages,
    options: [
        {
            name: 'channel',
            description: 'O canal que você deseja usar para controlar o player.',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],
    async execute({ inter, client }) { 
        let Channel = inter.options.getChannel('channel');

        if (Channel.type !== 0){ 
            return inter.editReply({ content: `Você precisa enviá-lo para um canal de texto.`, ephemeral: true})
        };
    
        const embed = new EmbedBuilder()
            .setColor(`#e76894`)
            .setTitle('Controle o player com os botões abaixo')
            .setImage(inter.guild.iconURL({ size: 4096, dynamic: true }))
            .setFooter({ text: `Sakura Server`, iconURL: `https://sakura.servegame.com/assets/images/favicon.png` })

        inter.editReply({ content: `Enviado o controle para ${Channel}`, ephemeral: true})

        const back = new ButtonBuilder()
            .setLabel('Anterior')
            .setCustomId(JSON.stringify({ffb: 'back'}))
            .setStyle('Primary')

        const skip = new ButtonBuilder()
            .setLabel('Próxima')
            .setCustomId(JSON.stringify({ffb: 'skip'}))
            .setStyle('Primary')

        const resumepause = new ButtonBuilder()
            .setLabel('Retornar & Pausar')
            .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
            .setStyle('Danger')

        const save = new ButtonBuilder()
            .setLabel('Salvar')
            .setCustomId(JSON.stringify({ffb: 'savetrack'}))
            .setStyle('Success')

        const volumeup = new ButtonBuilder()
            .setLabel('Aumentar volume')
            .setCustomId(JSON.stringify({ffb: 'volumeup'}))
            .setStyle('Primary')

        const volumedown = new ButtonBuilder()
            .setLabel('Abaixar volume')
            .setCustomId(JSON.stringify({ffb: 'volumedown'}))
            .setStyle('Primary')

        const loop = new ButtonBuilder()
            .setLabel('Repetição')
            .setCustomId(JSON.stringify({ffb: 'loop'}))
            .setStyle('Danger')

        const np = new ButtonBuilder()
            .setLabel('Tocando agora')
            .setCustomId(JSON.stringify({ffb: 'nowplaying'}))
            .setStyle('Secondary')
         
        const queuebutton = new ButtonBuilder()
            .setLabel('Playlist')
            .setCustomId(JSON.stringify({ffb: 'queue'}))
            .setStyle('Secondary')

        const lyrics = new ButtonBuilder()
            .setLabel('Letras')
            .setCustomId(JSON.stringify({ffb: 'lyrics'}))
            .setStyle('Primary')

        const shuffle = new ButtonBuilder()
            .setLabel('Embaralhar')
            .setCustomId(JSON.stringify({ffb: 'shuffle'}))
            .setStyle('Success')

        const stop = new ButtonBuilder()
            .setLabel('Parar')
            .setCustomId(JSON.stringify({ffb: 'stop'}))
            .setStyle('Danger')


        const row1 = new ActionRowBuilder().addComponents(back, queuebutton, resumepause, skip);
        const row2 = new ActionRowBuilder().addComponents(volumedown, loop, np, volumeup);
        const row3 = new ActionRowBuilder().addComponents(lyrics, shuffle, stop, save);

        Channel.send({ embeds: [embed], components: [row1, row2, row3] });
    }
};
