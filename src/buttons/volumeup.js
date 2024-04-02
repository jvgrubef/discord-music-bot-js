const maxVol = client.config.opt.maxVol;
module.exports = async ({  inter, queue }) => {
    if (!queue || !queue.isPlaying()){
        return inter.editReply({ content: `No momento, não há música tocando.`, ephemeral: true });
    };

    const vol = Math.floor(queue.node.volume + 5)

    if (vol > maxVol ){
        return inter.editReply({ content: `Não é possível aumentar mais o volume.`, ephemeral: true });
    };

    if (queue.node.volume === vol){ 
        return inter.editReply({ content: `O volume que você deseja alterar já está no nível atual.`, ephemeral: true });
    };

    const success = queue.node.setVolume(vol);
    return inter.editReply({ content: success ? `O volume foi modificado para ${vol}/${maxVol}%` : `Algo deu errado.`, ephemeral: true });
}
