const { Client, GatewayIntentBits } = require('discord.js');
const { Player }                    = require('discord-player');

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
    disableMentions: 'everyone'
});

client.config = require('./config');
const player  = new Player(client, client.config.opt.discordPlayer);

player.extractors.loadDefault();

require('./src/loader');
client.login(client.config.app.token);