import { Client, Intents, Snowflake } from "discord.js"
import { SongQueue } from "./libs/SongQueue"





//Setup discord client

const { token } = require('../bot-config.json')

const client: Client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})

export type QueueManager = {[guildId: string]: SongQueue}
const queueManager: QueueManager = {}
export {queueManager}




//setup event
require('./event/ready')(client)
require('./event/onMessageCreate')(client)



// login
client.login(token)

