const ms = require('ms');
module.exports = {
    name: 'ping',
    description: "Obtenha o ping do bot!",

    async execute({ client, inter }) {
        inter.editReply(`Pong! A latência da API é ${Math.round(client.ws.ping)}ms, o último batimento cardíaco foi calculado ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} atrás.`);
    }
};