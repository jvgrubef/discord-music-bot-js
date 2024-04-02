const { readdirSync }   = require('fs');
const { Collection }    = require('discord.js');
const { useMainPlayer } = require('discord-player');

client.commands = new Collection();
CommandsArray   = [];

const player        = useMainPlayer()
const DiscordEvents = readdirSync('./events/discord/').filter(file => file.endsWith('.js'));
const PlayerEvents  = readdirSync('./events/player/').filter(file => file.endsWith('.js'));

for (const file of DiscordEvents) {
    const DiscordEvent = require(`../events/discord/${file}`);
    client.on(file.split('.')[0], DiscordEvent.bind(null, client));
    delete require.cache[require.resolve(`../events/discord/${file}`)];
};

for (const file of PlayerEvents) {
    const PlayerEvent = require(`../events/player/${file}`);
    player.events.on(file.split('.')[0], PlayerEvent.bind(null));
    delete require.cache[require.resolve(`../events/player/${file}`)];
};

readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`../commands/${dirs}/${file}`);

        if (command.name && command.description) {

            CommandsArray.push(command);

            client.commands.set(command.name.toLowerCase(), command);
            delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];

        } else {
            console.log(`[failed Command]  ${command.name.toLowerCase()}`)
        };

    };
});

client.on('ready', (client) => {
    for(const itemGuild of client.config.app.guild) {
        try {
            client.guilds.cache.get(itemGuild).commands.set(CommandsArray);
        } catch(e) {
            console.log(`Error on ${itemGuild}`);
        }
    }
});
