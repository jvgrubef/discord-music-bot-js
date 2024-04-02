module.exports = async ({ inter, queue }) => { 
    if (!queue || !queue.isPlaying()){
        return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
    };

    queue.delete();

    return inter.editReply({ content: `A música parou.`, ephemeral: true });
};
