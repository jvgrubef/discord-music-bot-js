module.exports = (queue, track) => {
    if (!client.config.app.ExtraMessages) return;

    queue.metadata.send({ content: `A músicas ${track.title} foi adicionada na playlist.` });
};
