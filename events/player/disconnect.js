module.exports = (queue) => {
    queue.metadata.send({ content: `Desconectado do canal de voz, limpando a playlist.` });
};
