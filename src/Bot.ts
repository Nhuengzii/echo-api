import { Client, Intents, Snowflake } from "discord.js"
import { SongQueue } from "./libs/SongQueue"
import {addSpeechEvent, resolveSpeechWithWitai} from "discord-speech-recognition"
import {config} from "dotenv"



//Setup discord client
config()
const token = process.env.TOKEN

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
require('./event/speech')(client)


// login
client.login(token)

