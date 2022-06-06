import { Client, Intents } from "discord.js"





//Setup discord client

const { token } = require('../bot-config.json')

const client: Client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})




//setup event
require('./event/ready')(client)
require('./event/onMessageCreate')(client)



// login
client.login(token)

