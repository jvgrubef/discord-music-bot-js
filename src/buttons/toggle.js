module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.isPlaying()){
        return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
    };

    const resumed = queue.node.resume();
    let message = `A música "${queue.currentTrack.title}" foi retomada.`;
    
    if (!resumed){
        queue.node.pause();
        message = `A música "${queue.currentTrack.title}" foi pausada.`;
    };

    return inter.editReply({ content: message, ephemeral: true });
};
