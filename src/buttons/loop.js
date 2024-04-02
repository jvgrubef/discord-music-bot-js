const { QueueRepeatMode } = require('discord-player');
module.exports = async ({  inter, queue }) => { 
    const methods = ['Desabilitado', 'Atual', 'Playlist'];

    if (!queue || !queue.isPlaying()) {
        return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
    };

    switch (queue.repeatMode) {
        case 0:
            queue.setRepeatMode(QueueRepeatMode.TRACK);
            break;
        case 1:
            queue.setRepeatMode(QueueRepeatMode.QUEUE);
            break;
        case 2:
            queue.setRepeatMode(QueueRepeatMode.OFF);
            break;
    };
      
    return inter.editReply({ content: `A repetição foi definida como: ${methods[queue.repeatMode]}.` });
};
