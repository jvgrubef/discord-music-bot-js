module.exports = {
    app: {
        token: '',
        playing: 'something cool',
        guild: [],
        ExtraMessages: false,
        loopMessage: false,
    },

    opt: {
        maxVol: 100,
        spotifyBridge: true,
        volume: 75,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 30000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 30000,
        discordPlayer: {
            ytdlOptions: {
                filter: "audioonly",
                liveBuffer: 1 << 25,
                highWaterMark: 1 << 25,
                dlChunkSize: 0,
                bitrate: 128,
                quality: 'highestaudio'
            }
        }
    }
};
