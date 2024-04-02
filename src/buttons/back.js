module.exports = async ({  inter, queue }) => { 
    if(!queue || !queue.isPlaying()){
        return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
    };

    if(!queue.history.previousTrack){
        return inter.editReply({ content: `Não havia música sendo reproduzida antes.`, ephemeral: true });
    };

    await queue.history.back();
    inter.editReply({ content: `Tocando música anterior.`, ephemeral: true });
}
