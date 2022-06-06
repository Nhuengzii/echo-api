import { Client } from "discord.js";

module.exports =  (client: Client): void => {
    client.once('ready', () => {
        console.log(`${client.user?.username} is Online!`)
    })
}