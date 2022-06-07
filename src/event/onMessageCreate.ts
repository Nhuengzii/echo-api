import { Client, CommandInteraction } from "discord.js";
import { queueManager } from "../Bot";




module.exports =  (client: Client): void => {
    client.on('messageCreate', async (message) => {
        if(!message.content.startsWith('-')) return
        
        const commandName: string = message.content.split(' ', 1)[0]

        switch(commandName){
            case "-j":
                await require('../commands/join')(client, message.member, message)
                break;

            case "-p":
                const querry: string = message.content.split(' ', 2)[1]
                await require('../commands/play')(client, message.member, querry, message.channel, queueManager)
                break
            case "-q":
                await require('../commands/showQueue')(message.channel, queueManager)
                break         
            default:
                return;
        }
        

        
    })
}