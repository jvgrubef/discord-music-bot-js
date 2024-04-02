module.exports = async ({ inter, queue }) => { 
    if (!queue || !queue.isPlaying()){
        return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
    };

    if (!queue.tracks.toArray()[0]){
        return inter.editReply({ content: `Não há música na fila após a atual.`, ephemeral: true });
    };

    await queue.tracks.shuffle();
    return inter.editReply({ content: `Playlist embaralhada com ${queue.tracks.size} músicas.`, ephemeral: true});
}
