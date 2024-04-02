module.exports = (queue) => {
    queue.metadata.send({ content: `Não há mais músicas na playlist.` });
};
