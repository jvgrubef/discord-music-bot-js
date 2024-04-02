module.exports = async ({ inter, queue }) => { 
    if (!queue || !queue.isPlaying()){ 
        return inter.editReply({ content: `Nenhuma música tocando no momento.`, ephemeral: true });
    };
    
    const success = queue.node.skip();
    return inter.editReply({ content: success ? `A música "${queue.currentTrack.title}" foi pulada.` : `Algo deu errado.`, ephemeral: true });
}
