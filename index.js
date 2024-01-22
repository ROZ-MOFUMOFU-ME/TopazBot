const { Client } = require("discord.js");
const { joinVoiceChannel, entersState, VoiceConnectionStatus, createAudioResource, StreamType, createAudioPlayer, AudioPlayerStatus, NoSubscriberBehavior, generateDependencyReport } = require("@discordjs/voice");
const { token } = require('./config.json');
const client = new Client({ intents: ['GUILDS', 'GUILD_VOICE_STATES'] });
console.log(generateDependencyReport());
const subscriptions = new Map();
function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
let Stream = "maitake";
let Number = "0"
let url = null;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! client ready...`);
  });

// Handles slash command interactions
// play command
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guildId) return;
    let subscription = subscriptions.get(interaction.guildId);
    if (interaction.commandName === "play" + Number) {
        await interaction.deferReply();
        const guild = interaction.guild;
        const member = await guild.members.fetch(interaction.member.id);
        const memberVC = member.voice.channel;
        if (!memberVC) {
            return interaction.editReply({
                content: "Voice channel is not found to connect.",
                ephemeral: true,
            });
        }
        if (!memberVC.joinable) {
            return interaction.editReply({
                content: "Voice channel is inaccessible.",
                ephemeral: true,
            });
        }
        if (!memberVC.speakable) {
            return interaction.editReply({
                content: "Bot do not have permission to play audio in Voice channel.",
                ephemeral: true,
            });
        }
        const status = ["●Loading Sounds...", `●Connecting to ${memberVC}...`];
        const p = interaction.editReply(status.join("\n"));
        if (!connection) {
            connection = joinVoiceChannel({
                guildId: guild.id,
                channelId: memberVC.id,
                adapterCreator: guild.voiceAdapterCreator,
                selfMute: false,
            });
        };
        // Extract the stream URL from the command
        StreamKey = Stream + Number;
        url = "rtsp://topaz.chat/live/" + StreamKey;
        const resource = createAudioResource(url,
            {
                inputType: StreamType.Arbitrary,
            });
        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        player.play(resource, { highWaterMark: 1024 * 1024 * 50, volume: false });
        console.log(StreamKey + " is playing!");
        const promises = [];
        promises.push(entersState(connection, VoiceConnectionStatus.Ready, 1000 * 10).then(() => status[0] += "Done!"));
        promises.push(entersState(player, AudioPlayerStatus.AutoPaused, 1000 * 10).then(() => status[1] += "Done!"));
        await Promise.race(promises);
        await p;
        await Promise.all([...promises, interaction.editReply(status.join("\n"))]);
        connection.subscribe(player);
        await entersState(player, AudioPlayerStatus.Playing, 5000);
        await interaction.editReply("Playing " + StreamKey);
        await entersState(player, AudioPlayerStatus.Idle, 2 ** 31 - 1);
        console.log(StreamKey + " is stopped!");
        // Automatic disconnection if no stream is detected for 30 minutes
        let lastActivityTime = new Date();
        while (player.state.status === "idle") {
            const currentTime = new Date();
            await sleep(5000);
            if (connection.state.status === "destroyed") {
                break;
            }
            if (connection.state.subscription.player._state.status === "idle") {

                const resource = createAudioResource(url,
                    {
                        inputType: StreamType.Arbitrary,
                    });
                const player = createAudioPlayer({
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Pause,
                    },
                });
                await sleep(3000);
                console.log(StreamKey + " is autoresuming...");
                player.play(resource, { highWaterMark: 1024 * 1024 * 50, volume: false });
                connection.subscribe(player)
                await sleep(5000);
                if (connection.state.status === "destroyed") {
                    break;
                }
                if (connection.state.subscription.player._state.status === "playing") {
                    console.log(StreamKey + " is autoresumed!");
                    let lastActivityTime = new Date();
                }
                if (currentTime - lastActivityTime > 1800000) {
                    console.log(StreamKey + " is autodestroyed!");
                    connection.destroy();
                    break;
                }
            }
            continue;
        }
    }
    return {
        connection: connection,
        StreamKey: StreamKey,
        Number: Number,
        url: url,
    };
})

// resync command
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guildId) return;
    let connection = null;
    let subscription = subscriptions.get(interaction.guildId);
    if (interaction.commandName === "resync" + Number) {
        await interaction.deferReply();
        const guild = interaction.guild;
        const member = await guild.members.fetch(interaction.member.id);
        const memberVC = member.voice.channel;
        if (!memberVC) {
            return interaction.editReply({
                content: "Voice channel is not found to connect.",
                ephemeral: true,
            });
        }
        if (!memberVC.joinable) {
            return interaction.editReply({
                content: "Voice channel is inaccessible.",
                ephemeral: true,
            });
        }
        if (!memberVC.speakable) {
            return interaction.editReply({
                content: "Bot do not have permission to play audio in Voice channel.",
                ephemeral: true,
            });
        }
        const status = ["●Reloading Sounds...", `●Reconnecting to ${memberVC}...`];
        const p = interaction.editReply(status.join("\n"));
        if (!connection) {
            connection = joinVoiceChannel({
                guildId: guild.id,
                channelId: memberVC.id,
                adapterCreator: guild.voiceAdapterCreator,
                selfMute: false,
            });
        };
        const url = "rtsp://topaz.chat/live/" + StreamKey;
        const resource = createAudioResource(url,
            {
                inputType: StreamType.Arbitrary,
            });
        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        console.log(StreamKey + " is resyncing...");
        player.play(resource, { highWaterMark: 1024 * 1024 * 50, volume: false });
        console.log(StreamKey + " is playing!");
        const promises = [];
        promises.push(entersState(connection, VoiceConnectionStatus.Ready, 1000 * 10).then(() => status[0] += "Done!"));
        promises.push(entersState(player, AudioPlayerStatus.AutoPaused, 1000 * 10).then(() => status[1] += "Done!"));
        await Promise.race(promises);
        await p;
        await Promise.all([...promises, interaction.editReply(status.join("\n"))]);
        connection.subscribe(player);
        await entersState(player, AudioPlayerStatus.Playing, 5000);
        await interaction.editReply("Playing " + StreamKey);
        await entersState(player, AudioPlayerStatus.Idle, 2 ** 31 - 1);
        console.log(StreamKey + " is stopped!");
        // Automatic disconnection if no stream is detected for 30 minutes
        let lastActivityTime = new Date();
        while (player.state.status === "idle") {
            const currentTime = new Date();
            await sleep(5000);
            if (connection.state.status === "destroyed") {
                break;
            }
            if (connection.state.subscription.player._state.status === "idle") {

                const resource = createAudioResource(url,
                    {
                        inputType: StreamType.Arbitrary,
                    });
                const player = createAudioPlayer({
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Pause,
                    },
                });
                await sleep(3000);
                console.log(StreamKey + " is autoresuming...");
                player.play(resource, { highWaterMark: 1024 * 1024 * 50, volume: false });
                connection.subscribe(player)
                await sleep(5000);
                if (connection.state.status === "destroyed") {
                    break;
                }
                if (connection.state.subscription.player._state.status === "playing") {
                    console.log(StreamKey + " is autoresumed!");
                    let lastActivityTime = new Date();
                }
                if (currentTime - lastActivityTime > 1800000) {
                    console.log(StreamKey + " is autodestroyed!");
                    connection.destroy();
                    break;
                }
            }
            continue;
        }
    }
    connection = null;
});

// stop command
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guildId) return;
    let subscription = subscriptions.get(interaction.guildId);
    if (interaction.commandName === "stop" + Number) {
        await interaction.deferReply();
        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        const guild = interaction.guild;
        const member = await guild.members.fetch(interaction.member.id);
        const memberVC = member.voice.channel;
        const status = ["●Stopping Sounds...", `●Disconnecting from ${memberVC}...`];
        const p = interaction.editReply(status.join("\n"));
        if (!connection) {
            connection = joinVoiceChannel({
                guildId: guild.id,
                channelId: memberVC.id,
                adapterCreator: guild.voiceAdapterCreator,
                selfMute: false,
            });
        };
        const promises = [];
        promises.push(entersState(connection, VoiceConnectionStatus.Ready, 1000 * 10).then(() => status[0] += "Done!"));
        promises.push(entersState(player, AudioPlayerStatus.AutoPaused, 1000 * 10).then(() => status[1] += "Done!"));
        await Promise.race(promises);
        await p;
        console.log(StreamKey + " is destroyed!");
        connection.destroy();
        await interaction.editReply("Destroyed");
    };
    connection = null;
});

client.login(token)
