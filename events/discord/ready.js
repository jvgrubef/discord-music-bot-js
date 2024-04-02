module.exports = async (client) => {
    console.clear();
    console.log(`Logado como: ${client.user.username}`);
    client.user.setActivity(client.config.app.playing);   
};