module.exports = (queue) => {
    if (!client.config.app.ExtraMessages) return;
    
    queue.metadata.send({ content: `Todas as músicas da playlist foram adicionadas à playlist.` });
};
