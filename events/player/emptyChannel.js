module.exports = (queue) => {
    queue.metadata.send({ content: `Ninguém está no canal de voz, estou desconectando.` });
};
